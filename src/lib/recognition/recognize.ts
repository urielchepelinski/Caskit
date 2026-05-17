import { db } from '@/db'
import { perceptualHashes } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { compareHashes, HASH_MATCH_THRESHOLD } from './phash'
import { fuzzyMatchExpression, tokenMatchExpression } from './fuzzy-match'
import type { RecognitionResult } from './types'

export async function recognizeBottle(imageBuffer: Buffer): Promise<RecognitionResult> {
  // Stage 0: Perceptual hash cache lookup (instant, free)
  const cacheResult = await tryHashCache(imageBuffer)
  if (cacheResult) return cacheResult

  // Stage 1: Claude Vision → extract text + identify bottle
  const visionResult = await tryVisionApi(imageBuffer)
  if (visionResult) return visionResult

  // No match found
  return { expressionId: null, confidence: 0, method: 'manual' }
}

/**
 * Also exported for use with client-side OCR text (Tesseract.js)
 * Skips the Vision API call — just does fuzzy DB matching on provided text.
 */
export async function recognizeFromText(ocrText: string): Promise<RecognitionResult> {
  const matchResult = await matchTextToExpression(ocrText)
  if (matchResult) return matchResult
  return { expressionId: null, confidence: 0, method: 'manual' }
}

async function tryHashCache(imageBuffer: Buffer): Promise<RecognitionResult | null> {
  try {
    // @ts-ignore — optional dependency, handled by try/catch
    const { imageHash } = await import(/* webpackIgnore: true */ 'image-hash')
    const hash: string = await new Promise((resolve, reject) => {
      imageHash({ data: imageBuffer }, 16, true, (err: Error | null, data: string) => {
        if (err) reject(err)
        else resolve(data)
      })
    })

    const allHashes = await db.select().from(perceptualHashes)

    for (const stored of allHashes) {
      const distance = compareHashes(hash, stored.hashValue)
      if (distance <= HASH_MATCH_THRESHOLD) {
        await db.update(perceptualHashes)
          .set({ hitCount: (stored.hitCount ?? 0) + 1 })
          .where(eq(perceptualHashes.id, stored.id))

        return {
          expressionId: stored.expressionId,
          confidence: 1 - (distance / 64),
          method: 'cache',
        }
      }
    }
  } catch {
    // image-hash not available — skip
  }
  return null
}

async function tryVisionApi(imageBuffer: Buffer): Promise<RecognitionResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  try {
    const base64 = imageBuffer.toString('base64')
    const mediaType = 'image/jpeg'

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType, data: base64 },
            },
            {
              type: 'text',
              text: `You are a whiskey bottle identifier. Look at this image and extract:
1. ALL text visible on the label (distillery name, expression name, age, ABV, etc.)
2. Your best identification of the bottle

Return ONLY valid JSON:
{
  "label_text": "all raw text you can read on the label",
  "distillery": "distillery name",
  "expression": "full expression/bottle name including age if visible",
  "age_years": null or number,
  "abv": null or number,
  "confidence": 0.0-1.0
}

If you cannot identify this as a whiskey bottle, return:
{"label_text": "", "distillery": "", "expression": "", "age_years": null, "abv": null, "confidence": 0}`,
            },
          ],
        }],
      }),
    })

    if (!response.ok) {
      console.error('Vision API error:', response.status, await response.text())
      return null
    }

    const data = await response.json()
    const text = data.content?.[0]?.text
    if (!text) return null

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    const parsed = JSON.parse(jsonMatch[0])

    if (!parsed.label_text && !parsed.distillery && !parsed.expression) {
      return null // Not a whiskey bottle
    }

    // Use ALL extracted info for matching
    const searchText = [parsed.distillery, parsed.expression, parsed.label_text]
      .filter(Boolean)
      .join(' ')

    const matchResult = await matchTextToExpression(searchText)

    if (matchResult) {
      return {
        ...matchResult,
        method: 'vision_api',
        rawData: parsed,
      }
    }

    // Vision identified something but no DB match
    return {
      expressionId: null,
      confidence: parsed.confidence ?? 0.3,
      method: 'vision_api',
      rawData: parsed,
    }
  } catch (err) {
    console.error('Vision API error:', err)
    return null
  }
}

/**
 * Core matching logic: takes extracted text and finds best expression in DB.
 * Uses pg_trgm fuzzy similarity + token matching.
 */
async function matchTextToExpression(text: string): Promise<RecognitionResult | null> {
  // Try trigram similarity first (best for complete names)
  const fuzzyMatches = await fuzzyMatchExpression(text)

  if (fuzzyMatches.length > 0 && fuzzyMatches[0].score >= 0.5) {
    return {
      expressionId: fuzzyMatches[0].expressionId,
      confidence: Math.min(fuzzyMatches[0].score * 1.2, 1.0), // Boost slightly
      method: 'ocr',
      suggestions: fuzzyMatches.slice(0, 5).map(m => ({
        expressionId: m.expressionId,
        name: m.name,
        slug: m.slug,
        confidence: m.score,
      })),
    }
  }

  // Fall back to token matching (better for noisy/partial OCR)
  const tokenMatches = await tokenMatchExpression(text)

  if (tokenMatches.length > 0 && tokenMatches[0].score >= 0.4) {
    return {
      expressionId: tokenMatches[0].expressionId,
      confidence: tokenMatches[0].score,
      method: 'ocr',
      suggestions: tokenMatches.slice(0, 5).map(m => ({
        expressionId: m.expressionId,
        name: m.name,
        slug: m.slug,
        confidence: m.score,
      })),
    }
  }

  // Combine both result sets as suggestions even if no confident match
  const allSuggestions = [...fuzzyMatches, ...tokenMatches]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .filter((m, i, arr) => arr.findIndex(x => x.expressionId === m.expressionId) === i)

  if (allSuggestions.length > 0) {
    return {
      expressionId: null,
      confidence: allSuggestions[0].score,
      method: 'ocr',
      suggestions: allSuggestions.map(m => ({
        expressionId: m.expressionId,
        name: m.name,
        slug: m.slug,
        confidence: m.score,
      })),
    }
  }

  return null
}
