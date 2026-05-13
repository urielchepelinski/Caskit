import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function checkPremium(userId: string): Promise<boolean> {
  const [user] = await db.select({ tier: users.subscriptionTier })
    .from(users)
    .where(eq(users.id, userId))

  return user?.tier === 'premium'
}
