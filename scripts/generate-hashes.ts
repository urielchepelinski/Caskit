/**
 * Hash generation helper for Caskit
 * Reads expressions without perceptual hashes and generates placeholder hashes.
 * In production, this would process actual bottle images.
 * Run: tsx scripts/generate-hashes.ts
 */

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq, isNull } from 'drizzle-orm'
import { expressions, perceptualHashes } from '../src/db/schema'

const sqlClient = neon(process.env.DATABASE_URL!)
const db = drizzle(sqlClient)

// Seeded PRNG for deterministic hash generation (mulberry32)
function createRng(seed: number) {
  let s = seed | 0
  return function (): number {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rng = createRng(987654)

function generatePerceptualHash(): string {
  let hash = ''
  for (let i = 0; i < 64; i++) {
    hash += Math.floor(rng() * 16).toString(16)
  }
  return hash
}

function randomFloat(min: number, max: number): number {
  return parseFloat((rng() * (max - min) + min).toFixed(3))
}

const BATCH_SIZE = 100

async function main() {
  const startTime = Date.now()
  console.log('=== Caskit Hash Generation Script ===')
  console.log('')

  // Find all expressions that do NOT have a perceptual hash
  const expressionsWithoutHash = await db
    .select({ id: expressions.id, name: expressions.name })
    .from(expressions)
    .leftJoin(perceptualHashes, eq(expressions.id, perceptualHashes.expressionId))
    .where(isNull(perceptualHashes.id))

  const total = expressionsWithoutHash.length
  console.log(`Found ${total} expressions without perceptual hashes.`)

  if (total === 0) {
    console.log('Nothing to do. All expressions already have hashes.')
    return
  }

  console.log(`Processing in batches of ${BATCH_SIZE}...`)
  console.log('')

  let processed = 0

  for (let i = 0; i < expressionsWithoutHash.length; i += BATCH_SIZE) {
    const batch = expressionsWithoutHash.slice(i, i + BATCH_SIZE)

    const hashRecords = batch.map((expr) => ({
      hashValue: generatePerceptualHash(),
      expressionId: expr.id,
      confidence: randomFloat(0.85, 1.0),
      hitCount: 0,
    }))

    await db.insert(perceptualHashes).values(hashRecords)

    processed += batch.length

    if (processed % 500 === 0 || processed === total) {
      const pct = ((processed / total) * 100).toFixed(1)
      console.log(`  Generated hashes: ${processed}/${total} (${pct}%)`)
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log('')
  console.log('=== Hash Generation Complete ===')
  console.log(`  Expressions processed: ${processed}`)
  console.log(`  Hashes generated:      ${processed}`)
  console.log(`  Time:                  ${elapsed}s`)
}

main().catch((err) => {
  console.error('Hash generation failed:', err)
  process.exit(1)
})
