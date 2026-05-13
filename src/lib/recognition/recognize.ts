import { db } from '@/db'
import { perceptualHashes, expressions, bottles, distilleries } from '@/db/schema'
import { eq, ilike, or } from 'drizzle-orm'
import { compareHashes, HASH_MATCH_THRESHOLD } from './phash'
import type { RecognitionResult } from './types'

export async function recognizeBottle(imageBuffer: Buffer): Promise<RecognitionResult> {
  // Stage 0: Perceptual hash cache lookup (safe — catches errors)
  const cacheResult = await tryHashCache(imageBuffer)
  if (cacheResult) return cacheResult

  // Stage 1: Claude Vision API (requires ANTHROPIC_API_KEY)
  const visionResult = await tryVisionApi(imageBuffer)
  if (visionResult) return visionResult

  // No match found — caller should offer manual search
  return { expressionId: null, confidence: 0, method: 'manual' }
}

async function tryHashCache(imageBuffer: Buffer): Promise<RecognitionResult | null> {
  try {
    // Dynamic import of image-hash to avoid crash if not installed
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
    // Hash computation not available or failed — skip silently
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

    if (!response.ok) return null

    const data = await response.json()
    const text = data.content?.[0]?.text
    if (!text) return null

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null
    const parsed = JSON.parse(jsonMatch[0])

    // Try to match to existing expression in DB by slug or name
    const candidateSlug = slugify(`${parsed.distillery}-${parsed.bottle_name}-${parsed.expression}`)
    const searchName = `%${parsed.bottle_name || parsed.expression}%`

    const matches = await db.select({
      expression: expressions,
      bottle: bottles,
      distillery: distilleries,
    })
      .from(expressions)
      .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
      .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
      .where(
        or(
          eq(expressions.slug, candidateSlug),
          ilike(expressions.name, searchName),
        )
      )
      .limit(5)

    const suggestions = matches.map(m => ({
      expressionId: m.expression.id,
      name: m.expression.name,
      confidence: m.expression.slug === candidateSlug ? (parsed.confidence ?? 0.8) : 0.5,
    }))

    const bestMatch = suggestions.find(s => s.confidence >= 0.7)

    return {
      expressionId: bestMatch?.expressionId ?? null,
      confidence: bestMatch?.confidence ?? parsed.confidence ?? 0.5,
      method: 'vision_api',
      rawData: parsed,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
    }
  } catch {
    return null
  }
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
