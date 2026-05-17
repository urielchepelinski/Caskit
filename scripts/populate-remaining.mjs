/**
 * Find images for distilleries that still have zero bottle images.
 * Searches TWE by distillery name only, then assigns to all their expressions.
 *
 * Usage: node scripts/populate-remaining.mjs
 */

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const dbUrlMatch = envFile.match(/DATABASE_URL=(.+)/)
const DATABASE_URL = process.env.DATABASE_URL || dbUrlMatch?.[1]

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!DATABASE_URL || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing env vars. Set SUPABASE_URL and SUPABASE_SERVICE_KEY')
  process.exit(1)
}

const sql = neon(DATABASE_URL)
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

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

async function searchTWE(term) {
  try {
    const url = `https://www.thewhiskyexchange.com/search?q=${encodeURIComponent(term)}`
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    const html = await res.text()

    const imgMatches = [...html.matchAll(/https:\/\/img\.thewhiskyexchange\.com\/\d+\/[^"'\s]+\.jpg/g)]
    if (imgMatches.length > 0) {
      return imgMatches[0][0].replace(/\/\d+\//, '/900/')
    }
  } catch {}
  return null
}

async function uploadToSupabase(imageUrl, fileName) {
  const res = await fetch(imageUrl, {
    headers: { 'User-Agent': USER_AGENT },
    signal: AbortSignal.timeout(15000),
  })
  if (!res.ok) throw new Error(`Download failed: ${res.status}`)

  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const buffer = await res.arrayBuffer()
  if (buffer.byteLength < 1000) throw new Error('Image too small')

  const uploadRes = await fetch(
    `${SUPABASE_URL}/storage/v1/object/bottles/${fileName}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
        'Content-Type': contentType,
        'x-upsert': 'true',
      },
      body: buffer,
    }
  )
  if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`)

  return `${SUPABASE_URL}/storage/v1/object/public/bottles/${fileName}`
}

async function main() {
  console.log('Caskit — Find images for remaining distilleries\n')

  // Get distilleries where ALL expressions are still missing images
  const missing = await query`
    SELECT d.id, d.slug, d.name, COUNT(e.id) as expr_count
    FROM distilleries d
    JOIN bottles b ON b.distillery_id = d.id
    JOIN expressions e ON e.bottle_id = b.id
    WHERE e.image_url IS NULL
    AND d.id NOT IN (
      SELECT DISTINCT b2.distillery_id FROM bottles b2
      JOIN expressions e2 ON e2.bottle_id = b2.id
      WHERE e2.image_url IS NOT NULL
    )
    GROUP BY d.id, d.slug, d.name
    ORDER BY COUNT(e.id) DESC
  `

  console.log(`${missing.length} distilleries have zero images\n`)

  let found = 0
  let totalExpressions = 0

  for (const dist of missing) {
    process.stdout.write(`${dist.name} (${dist.expr_count} bottles)... `)

    // Try multiple search terms
    const terms = [
      dist.name,
      `${dist.name} whisky`,
      `${dist.name} whiskey bottle`,
    ]

    let imageUrl = null
    for (const term of terms) {
      imageUrl = await searchTWE(term)
      if (imageUrl) break
      await sleep(1200)
    }

    if (!imageUrl) {
      console.log('- not found')
      await sleep(1000)
      continue
    }

    try {
      const fileName = `distilleries/${dist.slug}.jpg`
      const publicUrl = await uploadToSupabase(imageUrl, fileName)

      // Assign to all expressions from this distillery
      const result = await query`
        UPDATE expressions SET image_url = ${publicUrl}
        WHERE image_url IS NULL
          AND bottle_id IN (SELECT id FROM bottles WHERE distillery_id = ${dist.id})
        RETURNING id
      `

      console.log(`+ ${result.length} bottles updated`)
      found++
      totalExpressions += result.length
    } catch (err) {
      console.log(`! ${err.message}`)
    }

    await sleep(1500)
  }

  // Final count
  const stillMissing = await query`
    SELECT COUNT(*) as count FROM expressions WHERE image_url IS NULL
  `

  console.log(`\n================================`)
  console.log(`Distilleries found: ${found}/${missing.length}`)
  console.log(`Expressions covered: ${totalExpressions}`)
  console.log(`Still missing: ${stillMissing[0].count}`)
  console.log(`Done!`)
}

main().catch(console.error)
