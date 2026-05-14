/**
 * Populate bottle images from Wikimedia Commons to Supabase Storage
 *
 * Usage: node scripts/populate-images.mjs
 *
 * Requires .env.local with DATABASE_URL, plus env vars:
 *   SUPABASE_URL and SUPABASE_SERVICE_KEY
 *
 * For each expression without a working image:
 * 1. Searches Wikimedia Commons for the bottle/distillery name
 * 2. Downloads the best image
 * 3. Uploads to Supabase Storage (bottles bucket)
 * 4. Updates the Neon DB with the permanent Supabase URL
 */

import { neon } from '@neondatabase/serverless'
import { readFileSync } from 'fs'

// Load DATABASE_URL from .env.local
const envFile = readFileSync('.env.local', 'utf-8')
const dbUrlMatch = envFile.match(/DATABASE_URL=(.+)/)
const DATABASE_URL = process.env.DATABASE_URL || dbUrlMatch?.[1]

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!DATABASE_URL || !SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Missing env vars. Run with:')
  console.error('  SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=eyJ... node scripts/populate-images.mjs')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

const WIKI_API = 'https://commons.wikimedia.org/w/api.php'
const USER_AGENT = 'CaskitBot/1.0 (https://caskit.vercel.app; image seeding script)'

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

/**
 * Search Wikimedia Commons for a whisky bottle image
 */
async function searchWikimediaImage(query) {
  const searchTerms = [
    `${query} whisky bottle`,
    `${query} whiskey`,
    query,
  ]

  for (const term of searchTerms) {
    try {
      const params = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrnamespace: '6',
        gsrsearch: term,
        gsrlimit: '3',
        prop: 'imageinfo',
        iiprop: 'url|size|mime',
        iiurlwidth: '400',
        format: 'json',
      })

      const res = await fetch(`${WIKI_API}?${params}`, {
        headers: { 'User-Agent': USER_AGENT },
        signal: AbortSignal.timeout(10000),
      })

      if (!res.ok) continue
      const data = await res.json()

      if (!data.query?.pages) continue

      const pages = Object.values(data.query.pages)
      for (const page of pages) {
        const info = page.imageinfo?.[0]
        if (!info) continue
        if (info.width < 200 || info.height < 200) continue
        if (info.mime === 'image/svg+xml') continue
        const title = (page.title || '').toLowerCase()
        if (title.includes('logo') || title.includes('flag') || title.includes('icon') || title.includes('map')) continue

        return info.thumburl || info.url
      }

      await sleep(1000)
    } catch {
      continue
    }
  }

  return null
}

/**
 * Download image and upload to Supabase Storage
 */
async function uploadToSupabase(imageUrl, fileName) {
  const res = await fetch(imageUrl, {
    headers: { 'User-Agent': USER_AGENT },
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) throw new Error(`Download failed: ${res.status}`)

  const contentType = res.headers.get('content-type') || 'image/jpeg'
  const buffer = await res.arrayBuffer()

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

  if (!uploadRes.ok) {
    const err = await uploadRes.text()
    throw new Error(`Upload failed: ${uploadRes.status} - ${err}`)
  }

  return `${SUPABASE_URL}/storage/v1/object/public/bottles/${fileName}`
}

async function main() {
  console.log('Caskit Image Populator')
  console.log('======================\n')

  const expressions = await sql`
    SELECT e.id, e.slug, e.name, e.image_url, d.name as distillery_name
    FROM expressions e
    JOIN bottles b ON e.bottle_id = b.id
    JOIN distilleries d ON b.distillery_id = d.id
    ORDER BY e.avg_community_score DESC NULLS LAST
  `

  console.log(`Found ${expressions.length} expressions total`)

  const distilleries = await sql`
    SELECT id, slug, name, image_url FROM distilleries ORDER BY name
  `

  console.log(`Found ${distilleries.length} distilleries total\n`)

  let updated = 0
  let skipped = 0
  let failed = 0

  for (const expr of expressions) {
    if (expr.image_url?.includes('supabase.co')) {
      skipped++
      continue
    }

    const searchQuery = `${expr.distillery_name} ${expr.name}`
    process.stdout.write(`[${updated + failed + skipped + 1}/${expressions.length}] ${searchQuery}... `)

    try {
      const imageUrl = await searchWikimediaImage(searchQuery)

      if (!imageUrl) {
        console.log('- no image found')
        failed++
        await sleep(1000)
        continue
      }

      const ext = imageUrl.includes('.png') ? 'png' : 'jpg'
      const fileName = `expressions/${expr.slug}.${ext}`

      const publicUrl = await uploadToSupabase(imageUrl, fileName)

      await sql`UPDATE expressions SET image_url = ${publicUrl} WHERE id = ${expr.id}`

      console.log('+ uploaded')
      updated++
    } catch (err) {
      console.log(`! ${err.message}`)
      failed++
    }

    await sleep(1200)
  }

  console.log('\n--- Distilleries ---\n')

  for (const dist of distilleries) {
    if (dist.image_url?.includes('supabase.co')) continue

    process.stdout.write(`${dist.name}... `)

    try {
      const imageUrl = await searchWikimediaImage(`${dist.name} distillery`)

      if (!imageUrl) {
        console.log('- no image found')
        await sleep(1000)
        continue
      }

      const ext = imageUrl.includes('.png') ? 'png' : 'jpg'
      const fileName = `distilleries/${dist.slug}.${ext}`

      const publicUrl = await uploadToSupabase(imageUrl, fileName)
      await sql`UPDATE distilleries SET image_url = ${publicUrl} WHERE id = ${dist.id}`

      console.log('+ uploaded')
    } catch (err) {
      console.log(`! ${err.message}`)
    }

    await sleep(1200)
  }

  console.log(`\n======================`)
  console.log(`Updated: ${updated}`)
  console.log(`Skipped (already done): ${skipped}`)
  console.log(`No image found: ${failed}`)
  console.log(`\nDone!`)
}

main().catch(console.error)
