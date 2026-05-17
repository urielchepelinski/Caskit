// Enable pg_trgm extension on Neon for fuzzy text matching
// Run: node scripts/enable-trgm.mjs

import { neon } from '@neondatabase/serverless'
import 'dotenv/config'

const sql = neon(process.env.DATABASE_URL)

async function main() {
  console.log('Enabling pg_trgm extension...')
  await sql`CREATE EXTENSION IF NOT EXISTS pg_trgm`
  console.log('Done. pg_trgm is now available.')

  // Test it works
  const [result] = await sql`SELECT similarity('Aberlour Abunadh', 'aberlour-abunadh') as score`
  console.log(`Test similarity score: ${result.score}`)

  // Create a GIN index on expression names for fast trigram search
  console.log('Creating trigram index on expressions.name...')
  await sql`CREATE INDEX IF NOT EXISTS expressions_name_trgm_idx ON expressions USING gin (name gin_trgm_ops)`
  console.log('Creating trigram index on distilleries.name...')
  await sql`CREATE INDEX IF NOT EXISTS distilleries_name_trgm_idx ON distilleries USING gin (name gin_trgm_ops)`
  console.log('All indexes created.')
}

main().catch(console.error)
