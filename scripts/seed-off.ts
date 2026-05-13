/**
 * Caskit Mass Seeder — Open Food Facts
 *
 * Fetches all whisky/whiskey products from Open Food Facts (CC-BY-SA licensed)
 * and inserts them into the Neon database.
 *
 * Data source: https://world.openfoodfacts.org (Creative Commons Attribution ShareAlike)
 * Total available: ~649 whiskies + ~3000 spirits
 *
 * Usage: npx tsx scripts/seed-off.ts
 */

// @ts-nocheck
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { eq } from 'drizzle-orm'
import { distilleries, bottles, expressions } from '../src/db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

// ============================================================
// Open Food Facts API helpers
// ============================================================

const OFF_BASE = 'https://world.openfoodfacts.org'
const USER_AGENT = 'Caskit-Seeder/1.0 (caskit.vercel.app)'
const RATE_LIMIT_MS = 1500 // 1.5s between requests to be polite

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

interface OFFProduct {
  code: string
  product_name?: string
  brands?: string
  categories_tags?: string[]
  image_front_url?: string
  image_url?: string
  countries_tags?: string[]
  quantity?: string
  alcohol?: string | number
  nutriments?: { alcohol?: number; 'alcohol_100g'?: number }
  labels_tags?: string[]
  origins_tags?: string[]
  manufacturing_places?: string
}

async function fetchJSON(url: string, retries = 3): Promise<any> {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT }
      })
      if (response.status === 503) {
        console.log(`  503 received, waiting ${(attempt + 1) * 3}s...`)
        await sleep((attempt + 1) * 3000)
        continue
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return await response.json()
    } catch (e) {
      if (attempt === retries - 1) throw e
      await sleep(2000)
    }
  }
}

async function fetchAllWhiskyProducts(): Promise<OFFProduct[]> {
  const allProducts: OFFProduct[] = []
  const categories = ['en:whisky', 'en:whiskies', 'en:scotch-whiskies', 'en:bourbon-whiskey', 'en:irish-whiskey', 'en:japanese-whisky', 'en:rye-whiskey', 'en:blended-scotch-whisky', 'en:single-malt-scotch-whisky']

  const seenCodes = new Set<string>()

  for (const category of categories) {
    console.log(`\nFetching category: ${category}...`)
    let page = 1
    let hasMore = true

    while (hasMore) {
      const url = `${OFF_BASE}/api/v2/search?categories_tags=${category}&fields=code,product_name,brands,categories_tags,image_front_url,image_url,countries_tags,quantity,nutriments,labels_tags,origins_tags,manufacturing_places&page=${page}&page_size=100`

      try {
        const data = await fetchJSON(url)
        const products = data?.products || []

        if (products.length === 0) {
          hasMore = false
          break
        }

        for (const p of products) {
          if (p.code && p.product_name && !seenCodes.has(p.code)) {
            seenCodes.add(p.code)
            allProducts.push(p)
          }
        }

        console.log(`  Page ${page}: ${products.length} products (total unique: ${allProducts.length})`)
        page++

        // OFF returns max ~1000 results per category, stop if we hit it
        if (page > 10) hasMore = false

        await sleep(RATE_LIMIT_MS)
      } catch (e) {
        console.error(`  Error on page ${page}: ${e}`)
        hasMore = false
      }
    }
  }

  console.log(`\nTotal unique whisky products fetched: ${allProducts.length}`)
  return allProducts
}

// ============================================================
// Data transformation helpers
// ============================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

function extractBrand(product: OFFProduct): string {
  if (product.brands) {
    // Take first brand if multiple are listed
    return product.brands.split(',')[0].trim()
  }
  // Try to extract from product name
  const name = product.product_name || ''
  const knownBrands = ['Johnnie Walker', 'Jack Daniel', 'Jameson', 'Glenfiddich', 'Glenlivet', 'Chivas Regal', 'Ballantine', 'Dewar', 'Famous Grouse', 'Monkey Shoulder', 'Laphroaig', 'Ardbeg', 'Highland Park', 'Oban', 'Dalwhinnie', 'Aberfeldy', 'Aberlour', 'Benromach', 'Bunnahabhain', 'Caol Ila', 'Cardhu', 'Craigellachie', 'Dalmore', 'Glen Grant', 'Glen Moray', 'Glendronach', 'Glengoyne', 'Glenmorangie', 'Knockando', 'Royal Salute', 'Springbank', 'Tomatin', 'Tomintoul', 'Tullamore', 'Bulleit', 'Woodford Reserve', 'Wild Turkey', 'Knob Creek', 'Four Roses', 'Jim Beam', 'Elijah Craig', 'Heaven Hill', 'Hibiki', 'Hakushu', 'Togouchi', 'Akashi', 'Nikka', 'Suntory', 'Bushmills', 'Redbreast', 'Powers', 'Midleton', 'Green Spot', 'Yellow Spot', 'Teeling', 'Connemara', 'Kilbeggan', 'Tyrconnell', 'Writers Tears']

  for (const brand of knownBrands) {
    if (name.toLowerCase().includes(brand.toLowerCase())) return brand
  }

  return name.split(/\s+/).slice(0, 2).join(' ') || 'Unknown'
}

function determineType(product: OFFProduct): string {
  const cats = (product.categories_tags || []).join(' ').toLowerCase()
  const name = (product.product_name || '').toLowerCase()
  const origins = (product.origins_tags || []).join(' ').toLowerCase()

  if (cats.includes('bourbon') || name.includes('bourbon')) return 'bourbon'
  if (cats.includes('rye-whisk') || name.includes('rye whiskey')) return 'rye'
  if (cats.includes('irish') || name.includes('irish')) return 'irish'
  if (cats.includes('japanese') || name.includes('japanese') || origins.includes('japan')) return 'japanese'
  if (cats.includes('scotch') || name.includes('scotch') || origins.includes('scotland') || origins.includes('united-kingdom')) return 'scotch'
  if (cats.includes('canadian') || name.includes('canadian')) return 'world'
  return 'world'
}

function determineCategory(product: OFFProduct): string {
  const cats = (product.categories_tags || []).join(' ').toLowerCase()
  const name = (product.product_name || '').toLowerCase()

  if (cats.includes('single-malt') || name.includes('single malt')) return 'single_malt'
  if (cats.includes('blended-scotch') || cats.includes('blended-whisk') || name.includes('blended')) return 'blended'
  if (cats.includes('grain') || name.includes('grain')) return 'grain'
  if (cats.includes('bourbon') || name.includes('bourbon')) return 'other'
  return 'other'
}

function determineCountry(product: OFFProduct): string {
  const origins = (product.origins_tags || []).join(' ').toLowerCase()
  const manufacturing = (product.manufacturing_places || '').toLowerCase()
  const type = determineType(product)

  if (origins.includes('scotland') || origins.includes('united-kingdom') || manufacturing.includes('scotland')) return 'Scotland'
  if (origins.includes('ireland') || manufacturing.includes('ireland')) return 'Ireland'
  if (origins.includes('japan') || manufacturing.includes('japan')) return 'Japan'
  if (origins.includes('united-states') || manufacturing.includes('kentucky') || manufacturing.includes('tennessee')) return 'United States'
  if (origins.includes('canada') || manufacturing.includes('canada')) return 'Canada'
  if (origins.includes('india') || manufacturing.includes('india')) return 'India'
  if (origins.includes('taiwan') || manufacturing.includes('taiwan')) return 'Taiwan'
  if (origins.includes('france') || manufacturing.includes('france')) return 'France'

  // Infer from type
  if (type === 'scotch') return 'Scotland'
  if (type === 'irish') return 'Ireland'
  if (type === 'bourbon' || type === 'rye') return 'United States'
  if (type === 'japanese') return 'Japan'

  return 'Unknown'
}

function extractABV(product: OFFProduct): number | null {
  // Try nutriments first
  if (product.nutriments?.alcohol) return product.nutriments.alcohol
  if (product.nutriments?.['alcohol_100g']) return product.nutriments['alcohol_100g']

  // Try alcohol field
  if (product.alcohol) {
    const val = parseFloat(String(product.alcohol))
    if (!isNaN(val) && val > 0 && val < 100) return val
  }

  // Try extracting from product name (e.g., "43%" or "40 %")
  const name = product.product_name || ''
  const match = name.match(/(\d{2,2}(?:\.\d)?)\s*%/)
  if (match) {
    const val = parseFloat(match[1])
    if (val >= 35 && val <= 75) return val
  }

  return null
}

function extractAge(name: string): number | null {
  const match = name.match(/(\d{1,2})\s*(?:year|yr|ans|año|年|y\.?o\.?)/i)
  if (match) {
    const age = parseInt(match[1])
    if (age >= 3 && age <= 50) return age
  }
  return null
}

function getImageUrl(product: OFFProduct): string | null {
  return product.image_front_url || product.image_url || null
}

// ============================================================
// Database insertion
// ============================================================

// Cache of distillery slugs to IDs to avoid duplicates
const distilleryCache = new Map<string, number>()
const bottleCache = new Map<string, number>()

async function getOrCreateDistillery(brand: string, country: string): Promise<number> {
  const slug = slugify(brand)

  if (distilleryCache.has(slug)) {
    return distilleryCache.get(slug)!
  }

  // Check if already exists in DB
  const existing = await db.select().from(distilleries).where(eq(distilleries.slug, slug))
  if (existing.length > 0) {
    distilleryCache.set(slug, existing[0].id)
    return existing[0].id
  }

  // Insert new distillery
  const [created] = await db.insert(distilleries).values({
    name: brand,
    slug,
    country,
    description: `Producer of ${brand} whisky.`,
    verified: false,
  }).returning()

  distilleryCache.set(slug, created.id)
  return created.id
}

async function getOrCreateBottle(distilleryId: number, name: string, type: string, category: string): Promise<number> {
  const slug = slugify(name)

  if (bottleCache.has(slug)) {
    return bottleCache.get(slug)!
  }

  // Check if already exists
  const existing = await db.select().from(bottles).where(eq(bottles.slug, slug))
  if (existing.length > 0) {
    bottleCache.set(slug, existing[0].id)
    return existing[0].id
  }

  const [created] = await db.insert(bottles).values({
    distilleryId,
    name,
    slug,
    type,
    category,
  }).returning()

  bottleCache.set(slug, created.id)
  return created.id
}

async function insertExpression(bottleId: number, product: OFFProduct): Promise<boolean> {
  const name = product.product_name!
  const slug = slugify(`${name}-${product.code}`)

  // Check if expression already exists
  const existing = await db.select().from(expressions).where(eq(expressions.slug, slug))
  if (existing.length > 0) return false

  const abv = extractABV(product)
  const age = extractAge(name)
  const imageUrl = getImageUrl(product)

  await db.insert(expressions).values({
    bottleId,
    name,
    slug,
    ageYears: age,
    abv,
    imageUrl,
    description: `${name}${abv ? ` (${abv}% ABV)` : ''}. Source: Open Food Facts (${product.code}).`,
    // No community score or reviews for freshly imported bottles
    avgCommunityScore: null,
    reviewCount: 0,
  })

  return true
}

// ============================================================
// Main execution
// ============================================================

async function main() {
  console.log('=== Caskit Mass Seeder: Open Food Facts ===')
  console.log('License: CC-BY-SA (Creative Commons Attribution ShareAlike)')
  console.log('')

  // Step 1: Fetch all whisky products from OFF
  const products = await fetchAllWhiskyProducts()

  // Filter to only products with names and preferably images
  const validProducts = products.filter(p =>
    p.product_name &&
    p.product_name.length > 2 &&
    !p.product_name.toLowerCase().includes('test')
  )

  console.log(`\nValid products to import: ${validProducts.length}`)
  console.log(`Products with images: ${validProducts.filter(p => getImageUrl(p)).length}`)

  // Step 2: Insert into database
  let inserted = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < validProducts.length; i++) {
    const product = validProducts[i]

    try {
      const brand = extractBrand(product)
      const country = determineCountry(product)
      const type = determineType(product)
      const category = determineCategory(product)

      // Create/get distillery
      const distilleryId = await getOrCreateDistillery(brand, country)

      // Create/get bottle (use brand + simplified name)
      const bottleName = product.product_name!
      const bottleId = await getOrCreateBottle(distilleryId, bottleName, type, category)

      // Insert expression
      const wasInserted = await insertExpression(bottleId, product)

      if (wasInserted) {
        inserted++
      } else {
        skipped++
      }

      if ((i + 1) % 50 === 0) {
        console.log(`  Progress: ${i + 1}/${validProducts.length} (inserted: ${inserted}, skipped: ${skipped})`)
      }
    } catch (e) {
      errors++
      if (errors <= 10) console.error(`  Error inserting "${product.product_name}": ${e}`)
    }
  }

  console.log('\n=== SEEDING COMPLETE ===')
  console.log(`Inserted: ${inserted} new expressions`)
  console.log(`Skipped (duplicates): ${skipped}`)
  console.log(`Errors: ${errors}`)
  console.log(`New distilleries created: ${distilleryCache.size}`)
  console.log(`New bottles created: ${bottleCache.size}`)

  // Final count
  const distCount = await db.select().from(distilleries)
  const bottleCount = await db.select().from(bottles)
  const exprCount = await db.select().from(expressions)
  console.log(`\nDatabase totals:`)
  console.log(`  Distilleries: ${distCount.length}`)
  console.log(`  Bottles: ${bottleCount.length}`)
  console.log(`  Expressions: ${exprCount.length}`)
}

main().catch(console.error)
