import { db } from '@/db'
import { expressions, bottles, distilleries } from '@/db/schema'
import { eq, desc, isNotNull } from 'drizzle-orm'
import { BottleImage } from '@/components/bottle/bottle-image'
import { Star } from 'lucide-react'
import Link from 'next/link'

export async function TopBottlesSection() {
  let topBottles: Array<{
    expression: typeof expressions.$inferSelect
    bottle: typeof bottles.$inferSelect
    distillery: typeof distilleries.$inferSelect
  }> = []

  try {
    topBottles = await db.select({
      expression: expressions,
      bottle: bottles,
      distillery: distilleries,
    })
      .from(expressions)
      .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
      .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
      .where(isNotNull(expressions.avgCommunityScore))
      .orderBy(desc(expressions.avgCommunityScore))
      .limit(5)
  } catch {
    topBottles = []
  }

  if (topBottles.length === 0) {
    return (
      <section className="px-5 mb-7">
        <div className="flex justify-between items-center mb-3.5">
          <h2 className="text-lg font-bold text-text-primary">Top Rated</h2>
          <Link href="/explore/top" className="text-[13px] text-accent font-medium">View All</Link>
        </div>
        <div className="rounded-card bg-surface border border-border p-5 text-center">
          <Star className="w-8 h-8 text-accent/30 mx-auto mb-2" strokeWidth={1} />
          <p className="text-xs text-text-muted">Rate bottles to see top picks here</p>
        </div>
      </section>
    )
  }

  return (
    <section className="px-5 mb-7">
      <div className="flex justify-between items-center mb-3.5">
        <h2 className="text-lg font-bold text-text-primary">Top Rated</h2>
        <Link href="/explore/top" className="text-[13px] text-accent font-medium">View All</Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {topBottles.map(({ expression, bottle, distillery: dist }, index) => (
          <Link
            key={expression.id}
            href={`/bottle/${expression.slug}`}
            className="flex gap-3.5 p-3 bg-surface rounded-card shadow-card border border-border items-center"
          >
            <div className="w-7 h-7 flex-shrink-0 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-xs font-bold text-accent">{index + 1}</span>
            </div>
            <div className="w-12 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-surface-light flex items-center justify-center">
              <BottleImage src={expression.imageUrl} alt={expression.name} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary truncate">{expression.name}</h3>
              <p className="text-[11px] text-text-secondary">{dist.name}</p>
              {expression.story && (
                <p className="font-story italic text-[11px] text-text-muted leading-[1.4] line-clamp-1 mt-0.5">
                  {expression.story}
                </p>
              )}
            </div>
            {expression.avgCommunityScore && (
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span className="text-sm font-bold text-text-primary">{Math.round(expression.avgCommunityScore)}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  )
}
