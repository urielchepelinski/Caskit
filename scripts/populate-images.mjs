/**
 * Assign distillery bottle images to all expressions missing images.
 * Uses the image already found for one bottle from the same distillery.
 *
 * Usage: node scripts/populate-images.mjs
 */

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const dbUrlMatch = envFile.match(/DATABASE_URL=(.+)/)
const DATABASE_URL = process.env.DATABASE_URL || dbUrlMatch?.[1]

if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function query(strings, ...values) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await sql(strings, ...values)
    } catch (err) {
      if (attempt === 2) throw err
      await sleep(3000)
    }
  }
}

async function main() {
  console.log('Caskit — Assign distillery images to missing bottles\n')

  // Get distilleries that have at least one expression with an image
  const distilleries = await query`
    SELECT DISTINCT d.id, d.name,
      (SELECT e2.image_url FROM expressions e2
       JOIN bottles b2 ON e2.bottle_id = b2.id
       WHERE b2.distillery_id = d.id AND e2.image_url IS NOT NULL
       LIMIT 1) as sample_image
    FROM distilleries d
  `

  const withImage = distilleries.filter(d => d.sample_image)
  console.log(`${withImage.length} distilleries have at least one bottle image`)

  let totalUpdated = 0

  for (const dist of withImage) {
    const result = await query`
      UPDATE expressions SET image_url = ${dist.sample_image}
      WHERE image_url IS NULL
        AND bottle_id IN (SELECT id FROM bottles WHERE distillery_id = ${dist.id})
      RETURNING id
    `

    if (result.length > 0) {
      console.log(`  ${dist.name}: ${result.length} bottles updated`)
      totalUpdated += result.length
    }
  }

  // Check how many are still missing
  const stillMissing = await query`
    SELECT COUNT(*) as count FROM expressions WHERE image_url IS NULL
  `

  console.log(`\n================================`)
  console.log(`Updated: ${totalUpdated}`)
  console.log(`Still missing: ${stillMissing[0].count}`)
  console.log(`Done!`)
}

main().catch(console.error)
