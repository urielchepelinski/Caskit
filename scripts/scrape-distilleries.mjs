/**
 * Find images for EACH individual expression (bottle) using Bing Image Search.
 * Searches by full expression name for per-bottle granularity.
 *
 * Usage: node scripts/scrape-distilleries.mjs
 */

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const dbUrlMatch = envFile.match(/DATABASE_URL=(.+)/)
const DATABASE_URL = process.env.DATABASE_URL || dbUrlMatch?.[1]
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!DATABASE_URL || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars')
  process.exit(1)
}

const sql = neon(DATABASE_URL)
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function query(strings, ...values) {
  for (let i = 0; i < 3; i++) {
    try { return await sql(strings, ...values) }
    catch (e) { if (i === 2) throw e; await sleep(3000) }
  }
}

async function uploadToSupabase(imageUrl, fileName) {
  const res = await fetch(imageUrl, {
    headers: { 'User-Agent': UA },
    signal: AbortSignal.timeout(20000),
  })
  if (!res.ok) throw new Error(`Download ${res.status}`)
  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const buffer = await res.arrayBuffer()
  if (buffer.byteLength < 3000) throw new Error('Too small')

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
  if (!uploadRes.ok) throw new Error(`Upload ${uploadRes.status}`)
  return `${SUPABASE_URL}/storage/v1/object/public/bottles/${fileName}`
}

/** Search Bing Images — extract full-res image URLs from HTML */
async function searchBingImages(searchTerm) {
  const url = `https://www.bing.com/images/search?q=${encodeURIComponent(searchTerm)}&first=1&count=10`

  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      'Accept': 'text/html',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) return []
  const html = await res.text()

  // Bing stores full image URLs in "murl" JSON field within the page
  const images = []
  const murlPattern = /"murl":"(https?:\/\/[^"]+)"/g
  let match
  while ((match = murlPattern.exec(html)) !== null) {
    let imgUrl = match[1].replace(/\\u002f/g, '/').replace(/\\\//g, '/')
    // Only keep actual image files
    if (!/\.(jpg|jpeg|png|webp)/i.test(imgUrl)) continue
    // Skip social media, icons, tiny images
    if (/icon|logo|avatar|social|favicon|badge|thumbnail/i.test(imgUrl)) continue
    images.push(imgUrl)
    if (images.length >= 5) break
  }

  return images
}

/** Find a product image for a specific bottle expression */
async function findBottleImage(expressionName, distilleryName, slug) {
  // Clean names
  const cleanExpr = expressionName
    .replace(/&quot;/g, '')
    .replace(/&[a-z]+;/g, '')
    .replace(/\b\d+\s*cl\b/gi, '')
    .trim()

  const cleanDist = distilleryName
    .replace(/&quot;/g, '')
    .replace(/&[a-z]+;/g, '')
    .trim()

  // Build targeted search queries — most specific first
  const searchTerms = [
    `${cleanExpr} bottle`,
    `${cleanDist} ${cleanExpr.replace(new RegExp(cleanDist, 'i'), '').trim()} bottle`,
    `${cleanExpr} whisky product photo`,
  ]

  for (const term of searchTerms) {
    if (term.trim().length < 5) continue
    const images = await searchBingImages(term)

    for (const imgUrl of images) {
      try {
        const publicUrl = await uploadToSupabase(imgUrl, `expressions/${slug}.jpg`)
        return publicUrl
      } catch (e) {
        // Image failed to download/upload, try next
        continue
      }
    }

    await sleep(1500)
  }

  return null
}

async function main() {
  console.log('Caskit — Per-Bottle Image Search (Bing)')
  console.log('========================================\n')

  // Get ALL expressions still missing images, with their distillery info
  const expressions = await query`
    SELECT e.id, e.slug, e.name, d.name as distillery_name
    FROM expressions e
    JOIN bottles b ON e.bottle_id = b.id
    JOIN distilleries d ON b.distillery_id = d.id
    WHERE e.image_url IS NULL
    ORDER BY d.name, e.name
  `

  console.log(`${expressions.length} bottles need images\n`)

  let found = 0, failed = 0

  for (let i = 0; i < expressions.length; i++) {
    const expr = expressions[i]
    const display = `${expr.distillery_name} — ${expr.name}`.slice(0, 65)
    process.stdout.write(`[${i+1}/${expressions.length}] ${display}... `)

    const imgUrl = await findBottleImage(expr.name, expr.distillery_name, expr.slug)

    if (imgUrl) {
      await query`UPDATE expressions SET image_url = ${imgUrl} WHERE id = ${expr.id}`
      found++
      console.log('OK')
    } else {
      failed++
      console.log('- not found')
    }

    // Rate limit: ~2s between searches
    await sleep(2000)

    // Progress report every 20 bottles
    if ((i + 1) % 20 === 0) {
      console.log(`\n  --- Progress: ${found} found, ${failed} failed ---\n`)
    }
  }

  const stillMissing = await query`SELECT COUNT(*) as count FROM expressions WHERE image_url IS NULL`
  console.log(`\n========================================`)
  console.log(`Found: ${found} | Failed: ${failed}`)
  console.log(`Still missing: ${stillMissing[0].count}`)
}

main().catch(console.error)
