import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { collections, expressions, bottles, distilleries } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { BottomNav } from '@/components/layout/bottom-nav'
import { ShelfTabs } from '@/components/shelf/shelf-tabs'

export default async function ShelfPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const userId = session.user.id!

  const userCollection = await db.select({
    collection: collections,
    expression: expressions,
    bottle: bottles,
    distillery: distilleries,
  })
    .from(collections)
    .innerJoin(expressions, eq(collections.expressionId, expressions.id))
    .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
    .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
    .where(eq(collections.userId, userId))

  const owned = userCollection.filter(c => c.collection.status === 'owned')
  const wishlist = userCollection.filter(c => c.collection.status === 'wishlist')
  const tasted = userCollection.filter(c => c.collection.status === 'tasted')

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">My Shelf</h1>
        <p className="text-sm text-text-secondary mt-1">
          {userCollection.length} {userCollection.length === 1 ? 'bottle' : 'bottles'} in your collection
        </p>
      </header>

      <ShelfTabs owned={owned} wishlist={wishlist} tasted={tasted} />

      <BottomNav active="shelf" />
    </div>
  )
}
