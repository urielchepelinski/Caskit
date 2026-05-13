import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { collections, expressions, bottles, reviews } from '@/db/schema'
import { eq, count, avg, sql } from 'drizzle-orm'
import { BottomNav } from '@/components/layout/bottom-nav'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default async function StatsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const userId = session.user.id!

  let bottleCount = { count: 0 }
  let reviewStats = { count: 0, avgScore: null as string | null }
  let typeDistribution: { type: string; count: number }[] = []

  try {
    const [bc] = await db.select({ count: count() })
      .from(collections).where(eq(collections.userId, userId))
    bottleCount = bc

    const [rs] = await db.select({
      count: count(),
      avgScore: avg(reviews.score),
    }).from(reviews).where(eq(reviews.userId, userId))
    reviewStats = rs

    typeDistribution = await db.select({
      type: bottles.type,
      count: count(),
    })
      .from(collections)
      .innerJoin(expressions, eq(collections.expressionId, expressions.id))
      .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
      .where(eq(collections.userId, userId))
      .groupBy(bottles.type)
  } catch {
    // All values stay as zero/empty fallbacks
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center gap-3 px-5 pt-4 pb-3">
        <Link href="/shelf">
          <ArrowLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
        </Link>
        <h1 className="text-lg font-bold">Collection Stats</h1>
      </header>

      <div className="px-5 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total Bottles" value={String(bottleCount.count)} />
          <StatCard label="Reviews Written" value={String(reviewStats.count)} />
          <StatCard label="Avg Rating" value={reviewStats.avgScore ? `${Number(reviewStats.avgScore).toFixed(0)}/100` : '-'} />
          <StatCard label="Types Explored" value={String(typeDistribution.length)} />
        </div>

        <div className="bg-surface rounded-card border border-border p-4">
          <h3 className="text-sm font-semibold mb-3">By Style</h3>
          {typeDistribution.map((t) => (
            <div key={t.type} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <span className="text-sm text-text-secondary capitalize">{t.type}</span>
              <span className="text-sm font-semibold">{t.count}</span>
            </div>
          ))}
          {typeDistribution.length === 0 && (
            <p className="text-sm text-text-muted">No bottles yet</p>
          )}
        </div>
      </div>

      <BottomNav active="shelf" />
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface rounded-card border border-border p-4 text-center">
      <div className="text-xl font-bold text-accent">{value}</div>
      <div className="text-xs text-text-secondary mt-1">{label}</div>
    </div>
  )
}
