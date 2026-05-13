import { db } from '@/db'
import { reviews, users } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { recalculateCommunityScore } from '@/lib/ratings'
import type { ReviewInput, ReviewWithUser } from './types'

export async function submitReview(userId: string, input: ReviewInput) {
  const [review] = await db.insert(reviews).values({
    userId,
    expressionId: input.expressionId,
    score: input.score,
    nose: input.nose,
    palate: input.palate,
    finish: input.finish,
    liked: input.liked,
  }).onConflictDoUpdate({
    target: [reviews.userId, reviews.expressionId],
    set: {
      score: input.score,
      nose: input.nose,
      palate: input.palate,
      finish: input.finish,
      liked: input.liked,
      updatedAt: new Date(),
    },
  }).returning()

  await recalculateCommunityScore(input.expressionId)
  return review
}

export async function getUserReview(userId: string, expressionId: number) {
  const [review] = await db.select()
    .from(reviews)
    .where(and(eq(reviews.userId, userId), eq(reviews.expressionId, expressionId)))

  return review ?? null
}

export async function getExpressionReviews(expressionId: number, limit = 20): Promise<ReviewWithUser[]> {
  const result = await db.select({
    id: reviews.id,
    score: reviews.score,
    nose: reviews.nose,
    palate: reviews.palate,
    finish: reviews.finish,
    liked: reviews.liked,
    createdAt: reviews.createdAt,
    userName: users.name,
    userAvatar: users.avatarUrl,
  })
    .from(reviews)
    .leftJoin(users, eq(reviews.userId, users.id))
    .where(eq(reviews.expressionId, expressionId))
    .orderBy(desc(reviews.createdAt))
    .limit(limit)

  return result.map(r => ({
    id: r.id,
    score: r.score,
    nose: r.nose,
    palate: r.palate,
    finish: r.finish,
    liked: r.liked,
    createdAt: r.createdAt,
    user: { name: r.userName, avatarUrl: r.userAvatar },
  }))
}
