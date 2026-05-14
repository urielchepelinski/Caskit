import { MapPin } from 'lucide-react'
import { db } from '@/db'
import { distilleries, bottles } from '@/db/schema'
import { eq, count, desc } from 'drizzle-orm'
import Link from 'next/link'
import { HorizontalScroller } from '@/components/ui/horizontal-scroller'

export async function DistillerySection() {
  let distilleryList: Array<{
    distillery: typeof distilleries.$inferSelect
    bottleCount: number
  }> = []

  try {
    const rows = await db.select({
      distillery: distilleries,
      bottleCount: count(bottles.id),
    })
      .from(distilleries)
      .leftJoin(bottles, eq(bottles.distilleryId, distilleries.id))
      .groupBy(distilleries.id)
      .orderBy(desc(distilleries.name))
      .limit(8)

    // Sort by bottle count descending in JS since drizzle can't order by aggregate
    distilleryList = rows
      .map(r => ({ distillery: r.distillery, bottleCount: Number(r.bottleCount) }))
      .sort((a, b) => b.bottleCount - a.bottleCount)
  } catch {
    distilleryList = []
  }

  if (distilleryList.length === 0) return null

  return (
    <section className="mb-7">
      <div className="flex justify-between items-center mb-3.5 px-5">
        <h2 className="text-lg font-bold text-text-primary">Popular Distilleries</h2>
        <Link href="/explore/distilleries" className="text-[13px] text-accent font-medium">View All</Link>
      </div>

      <HorizontalScroller>
        {distilleryList.map(({ distillery: d, bottleCount }) => (
          <Link
            key={d.id}
            href={`/distillery/${d.slug}`}
            className="min-w-[200px] max-w-[200px] bg-surface rounded-card overflow-hidden shadow-card border border-border flex-shrink-0 block p-4"
          >
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
              {d.logoUrl ? (
                <img src={d.logoUrl} alt={d.name} className="w-8 h-8 object-contain rounded-full" />
              ) : (
                <span className="text-lg font-bold text-accent">{d.name.charAt(0)}</span>
              )}
            </div>
            <h3 className="text-sm font-bold text-text-primary truncate">{d.name}</h3>
            {d.region && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-text-muted" strokeWidth={1.5} />
                <p className="text-[11px] text-text-secondary truncate">{d.region}, {d.country}</p>
              </div>
            )}
            <p className="text-[11px] text-text-muted mt-1.5">
              <strong className="text-text-primary">{bottleCount}</strong> expressions
            </p>
          </Link>
        ))}
      </HorizontalScroller>
    </section>
  )
}
