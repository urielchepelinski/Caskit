import { db } from '@/db'
import { perceptualHashes, expressions } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { computePerceptualHash, compareHashes, HASH_MATCH_THRESHOLD } from './phash'
import type { RecognitionResult } from './types'

export async function recognizeBottle(imageBuffer: Buffer): Promise<RecognitionResult> {
  // Stage 0: Perceptual hash cache lookup
  const cacheResult = await tryHashCache(imageBuffer)
  if (cacheResult) return cacheResult

  // Stage 1: Lightweight classifier (future implementation)
  // const classifierResult = await tryClassifier(imageBuffer)
  // if (classifierResult) return classifierResult

  // Stage 2: OCR → fuzzy search (future implementation)
  // const ocrResult = await tryOcr(imageBuffer)
  // if (ocrResult) return ocrResult

  // Stage 3: Claude Vision API (last resort)
  const visionResult = await tryVisionApi(imageBuffer)
  if (visionResult) return visionResult

  // No match found
  return { expressionId: null, confidence: 0, method: 'manual' }
}

async function tryHashCache(imageBuffer: Buffer): Promise<RecognitionResult | null> {
  try {
    const hash = computePerceptualHash(imageBuffer)
    const allHashes = await db.select().from(perceptualHashes)

    for (const stored of allHashes) {
      const distance = compareHashes(hash, stored.hashValue)
      if (distance <= HASH_MATCH_THRESHOLD) {
        // Update hit count
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
    // Hash computation failed, fall through to next stage
  }
  return null
}

async function tryVisionApi(imageBuffer: Buffer): Promise<RecognitionResult | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  try {
    const base64 = imageBuffer.toString('base64')
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: base64 },
            },
            {
              type: 'text',
              text: 'Identify this whiskey bottle. Return ONLY valid JSON with these fields: distillery, bottle_name, expression, age_years (number or null), abv (number or null), volume_ml (number or null), cask_type, region, country, type (scotch/bourbon/rye/irish/japanese/world), category (single_malt/blended/grain/other), limited_edition (boolean), confidence (0-1).',
            },
          ],
        }],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text
    if (!text) return null

    const parsed = JSON.parse(text)

    // Try to match to existing expression in DB
    const matches = await db.select().from(expressions)
      .where(eq(expressions.slug, slugify(`${parsed.distillery}-${parsed.bottle_name}-${parsed.expression}`)))

    return {
      expressionId: matches[0]?.id ?? null,
      confidence: parsed.confidence ?? 0.7,
      method: 'vision_api',
      rawData: parsed,
    }
  } catch {
    return null
  }
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
