import { db } from '@/db'
import { expressions, bottles, distilleries } from '@/db/schema'
import { eq, desc, isNotNull, sql } from 'drizzle-orm'

/**
 * Get top-rated bottles from distilleries in a specific country.
 * Falls back to global top-rated if country has no results.
 */
export async function getPopularInCountry(country: string | null, limit = 6) {
  if (country) {
    const results = await db.select({
      expression: expressions,
      bottle: bottles,
      distillery: distilleries,
    })
      .from(expressions)
      .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
      .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
      .where(sql`${distilleries.country} = ${country} AND ${expressions.avgCommunityScore} IS NOT NULL`)
      .orderBy(desc(expressions.avgCommunityScore))
      .limit(limit)

    if (results.length > 0) return results
  }

  // Fallback: global top-rated
  return db.select({
    expression: expressions,
    bottle: bottles,
    distillery: distilleries,
  })
    .from(expressions)
    .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
    .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
    .where(isNotNull(expressions.avgCommunityScore))
    .orderBy(desc(expressions.avgCommunityScore))
    .limit(limit)
}

/**
 * Get distilleries from a specific country, sorted by bottle count.
 */
export async function getDistilleriesInCountry(country: string | null, limit = 8) {
  if (country) {
    const results = await db.select()
      .from(distilleries)
      .where(eq(distilleries.country, country))
      .limit(limit)

    if (results.length > 0) return results
  }

  // Fallback: distilleries with most bottles
  return db.select()
    .from(distilleries)
    .orderBy(desc(distilleries.name))
    .limit(limit)
}
