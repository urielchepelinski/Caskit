import { db } from '@/db'
import { expressions, awardScores, reviews } from '@/db/schema'
import { eq, avg, count } from 'drizzle-orm'
import type { BottleScores } from './types'

export async function getBottleScores(expressionId: number): Promise<BottleScores> {
  const [expression] = await db.select({
    avgScore: expressions.avgCommunityScore,
    reviewCount: expressions.reviewCount,
  }).from(expressions).where(eq(expressions.id, expressionId))

  const awards = await db.select({
    competition: awardScores.competitionName,
    year: awardScores.year,
    level: awardScores.awardLevel,
    score: awardScores.score,
  }).from(awardScores).where(eq(awardScores.expressionId, expressionId))

  return {
    communityScore: expression?.avgScore ?? null,
    reviewCount: expression?.reviewCount ?? 0,
    awards: awards.map(a => ({
      competition: a.competition,
      year: a.year,
      level: a.level,
      score: a.score,
    })),
  }
}

export async function recalculateCommunityScore(expressionId: number): Promise<void> {
  const result = await db.select({
    avgScore: avg(reviews.score),
    totalReviews: count(reviews.id),
  }).from(reviews).where(eq(reviews.expressionId, expressionId))

  const avgScore = result[0]?.avgScore ? Number(result[0].avgScore) : null
  const totalReviews = Number(result[0]?.totalReviews ?? 0)

  // Only show community score if 5+ reviews
  await db.update(expressions).set({
    avgCommunityScore: totalReviews >= 5 ? avgScore : null,
    reviewCount: totalReviews,
  }).where(eq(expressions.id, expressionId))
}
