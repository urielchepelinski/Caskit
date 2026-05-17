/**
 * Export all expressions to CSV for manual image assignment.
 * Usage: node scripts/export-csv.mjs
 */

import { neon } from '@neondatabase/serverless'
import { readFileSync, writeFileSync } from 'fs'

const envFile = readFileSync('.env.local', 'utf-8')
const dbUrlMatch = envFile.match(/DATABASE_URL=(.+)/)
const DATABASE_URL = process.env.DATABASE_URL || dbUrlMatch?.[1]

if (!DATABASE_URL) {
  console.error('Missing DATABASE_URL')
  process.exit(1)
}

const sql = neon(DATABASE_URL)

async function main() {
  const rows = await sql`
    SELECT e.slug, d.name as distillery, e.name, e.image_url
    FROM expressions e
    JOIN bottles b ON e.bottle_id = b.id
    JOIN distilleries d ON b.distillery_id = d.id
    ORDER BY d.name, e.name
  `

  const header = 'slug,distillery,name,image_url'
  const lines = rows.map(r => {
    const esc = (s) => `"${(s || '').replace(/"/g, '""')}"`
    return `${esc(r.slug)},${esc(r.distillery)},${esc(r.name)},${r.image_url || ''}`
  })

  const csv = [header, ...lines].join('\n')
  writeFileSync('scripts/bottles.csv', csv, 'utf-8')

  const missing = rows.filter(r => !r.image_url).length
  console.log(`Exported ${rows.length} expressions to scripts/bottles.csv`)
  console.log(`${missing} are missing images (empty image_url column)`)
}

main().catch(console.error)
