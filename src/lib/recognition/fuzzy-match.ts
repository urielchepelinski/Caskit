import { neon } from '@neondatabase/serverless'

interface FuzzyMatch {
  expressionId: number
  name: string
  slug: string
  distillery: string
  score: number
}

/**
 * Fuzzy match OCR text against expressions using pg_trgm similarity.
 * Searches both expression name and distillery name.
 * Returns top 5 matches sorted by score.
 */
export async function fuzzyMatchExpression(ocrText: string): Promise<FuzzyMatch[]> {
  const sql = neon(process.env.DATABASE_URL!)

  // Clean up OCR text: remove common non-useful tokens
  const cleaned = ocrText
    .replace(/\b(whisky|whiskey|single malt|scotch|bourbon|ml|cl|vol|alc|product of)\b/gi, '')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (!cleaned || cleaned.length < 3) return []

  // Use pg_trgm similarity to find best matches
  // We search against a combined string of "distillery_name expression_name"
  const results = await sql`
    SELECT
      e.id as expression_id,
      e.name as expression_name,
      e.slug,
      d.name as distillery_name,
      GREATEST(
        similarity(e.name, ${cleaned}),
        similarity(d.name || ' ' || e.name, ${cleaned}),
        similarity(e.name, ${ocrText})
      ) as score
    FROM expressions e
    JOIN bottles b ON e.bottle_id = b.id
    JOIN distilleries d ON b.distillery_id = d.id
    WHERE
      similarity(e.name, ${cleaned}) > 0.2
      OR similarity(d.name || ' ' || e.name, ${cleaned}) > 0.25
      OR similarity(e.name, ${ocrText}) > 0.2
    ORDER BY score DESC
    LIMIT 5
  `

  return results.map((r: any) => ({
    expressionId: r.expression_id,
    name: r.expression_name,
    slug: r.slug,
    distillery: r.distillery_name,
    score: parseFloat(r.score),
  }))
}

/**
 * Token-based matching: split OCR text into tokens and find expressions
 * whose name contains the most matching tokens. Good for partial/noisy OCR.
 */
export async function tokenMatchExpression(ocrText: string): Promise<FuzzyMatch[]> {
  const sql = neon(process.env.DATABASE_URL!)

  // Extract meaningful tokens (3+ chars, not common words)
  const stopWords = new Set(['the', 'and', 'for', 'from', 'with', 'single', 'malt', 'whisky', 'whiskey', 'scotch', 'bourbon', 'aged', 'years', 'year', 'old', 'cask', 'edition', 'limited', 'special', 'reserve', 'product', 'scotland', 'distillery'])
  const tokens = ocrText
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3 && !stopWords.has(t))

  if (tokens.length === 0) return []

  // Build ILIKE conditions for each token
  const conditions = tokens.slice(0, 6).map(t => `%${t}%`) // Max 6 tokens

  const results = await sql`
    SELECT
      e.id as expression_id,
      e.name as expression_name,
      e.slug,
      d.name as distillery_name,
      (
        SELECT COUNT(*)::float / ${tokens.length}
        FROM unnest(${conditions}::text[]) pattern
        WHERE lower(d.name || ' ' || e.name) LIKE pattern
      ) as score
    FROM expressions e
    JOIN bottles b ON e.bottle_id = b.id
    JOIN distilleries d ON b.distillery_id = d.id
    WHERE EXISTS (
      SELECT 1 FROM unnest(${conditions}::text[]) pattern
      WHERE lower(d.name || ' ' || e.name) LIKE pattern
    )
    ORDER BY score DESC
    LIMIT 5
  `

  return results
    .filter((r: any) => parseFloat(r.score) > 0.3)
    .map((r: any) => ({
      expressionId: r.expression_id,
      name: r.expression_name,
      slug: r.slug,
      distillery: r.distillery_name,
      score: parseFloat(r.score),
    }))
}
