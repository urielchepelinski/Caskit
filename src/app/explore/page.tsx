import { db } from '@/db'
import { expressions, bottles, distilleries } from '@/db/schema'
import { eq, desc, isNotNull } from 'drizzle-orm'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { BottleImage } from '@/components/bottle/bottle-image'
import Link from 'next/link'
import { Compass, Star, Globe, TrendingUp } from 'lucide-react'

const CATEGORIES = [
  { value: 'scotch', label: 'Scotch', emoji: '\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F' },
  { value: 'bourbon', label: 'Bourbon', emoji: '\uD83C\uDDFA\uD83C\uDDF8' },
  { value: 'rye', label: 'Rye', emoji: '\uD83C\uDF3E' },
  { value: 'irish', label: 'Irish', emoji: '\uD83C\uDDEE\uD83C\uDDEA' },
  { value: 'japanese', label: 'Japanese', emoji: '\uD83C\uDDEF\uD83C\uDDF5' },
  { value: 'world', label: 'World Whisky', emoji: '\uD83C\uDF0D' },
]

const REGIONS = [
  { value: 'islay', label: 'Islay', country: 'Scotland', description: 'Peated & maritime' },
  { value: 'speyside', label: 'Speyside', country: 'Scotland', description: 'Fruity & elegant' },
  { value: 'highland', label: 'Highland', country: 'Scotland', description: 'Diverse & robust' },
  { value: 'kentucky', label: 'Kentucky', country: 'USA', description: 'Sweet & oaky' },
  { value: 'campbeltown', label: 'Campbeltown', country: 'Scotland', description: 'Briny & complex' },
  { value: 'lowland', label: 'Lowland', country: 'Scotland', description: 'Light & floral' },
]

export default async function ExplorePage() {
  let featured = null
  let topRated: Array<{ expression: typeof expressions.$inferSelect; bottle: typeof bottles.$inferSelect; distillery: typeof distilleries.$inferSelect }> = []

  try {
    const allExpressions = await db.select({
      expression: expressions,
      bottle: bottles,
      distillery: distilleries,
    })
      .from(expressions)
      .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
      .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
      .where(isNotNull(expressions.avgCommunityScore))
      .orderBy(desc(expressions.avgCommunityScore))
      .limit(10)

    if (allExpressions.length > 0) {
      const randomIndex = Math.floor(Math.random() * Math.min(allExpressions.length, 5))
      featured = allExpressions[randomIndex]
      topRated = allExpressions.slice(0, 8)
    }
  } catch {
    featured = null
    topRated = []
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <section className="px-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Compass className="w-5 h-5 text-accent" strokeWidth={1.5} />
          <h2 className="text-xl font-display font-bold text-text-primary">Explore</h2>
        </div>

        {featured ? (
          <Link
            href={`/bottle/${featured.expression.slug}`}
            className="block relative overflow-hidden rounded-card bg-surface border border-border p-4"
          >
            <div className="absolute top-3 right-3 bg-accent/20 text-accent text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
              Recommended
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 h-28 flex-shrink-0 rounded-sm overflow-hidden bg-surface-light flex items-center justify-center">
                <BottleImage
                  src={featured.expression.imageUrl}
                  alt={featured.expression.name}
                  className="h-[90%] w-auto object-contain"
                  placeholderClassName="w-10 h-20"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-accent font-medium uppercase tracking-wide mb-1">
                  Recommended for You
                </p>
                <h3 className="text-base font-bold text-text-primary truncate">
                  {featured.expression.name}
                </h3>
                <p className="text-xs text-text-secondary mt-0.5">{featured.distillery.name}</p>
                {featured.expression.avgCommunityScore && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span className="text-sm font-bold text-text-primary">
                      {Math.round(featured.expression.avgCommunityScore)}
                    </span>
                    <span className="text-xs text-text-muted">/ 100</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ) : (
          <div className="relative overflow-hidden rounded-card bg-surface border border-border p-6 text-center">
            <Compass className="w-10 h-10 text-accent/40 mx-auto mb-2" strokeWidth={1} />
            <p className="text-sm text-text-secondary">Start exploring whisky</p>
            <p className="text-xs text-text-muted mt-1">Scan a bottle to get personalized recommendations</p>
          </div>
        )}
      </section>

      <section className="px-5 mb-7">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-bold text-text-primary">Browse by Category</h2>
          <Link href="/explore/categories" className="text-[12px] text-accent font-medium">View All</Link>
        </div>
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/explore/${cat.value}`}
              className="flex flex-col items-center gap-2 p-3.5 bg-surface rounded-card border border-border hover:border-accent/50 active:border-accent/50 active:scale-[0.98] transition-colors"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="text-xs font-medium text-text-primary">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 mb-7">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <h2 className="text-base font-bold text-text-primary">Top Rated</h2>
          </div>
          <Link href="/explore/top" className="text-[12px] text-accent font-medium">See All</Link>
        </div>
        {topRated.length > 0 ? (
          <div className="space-y-2.5">
            {topRated.slice(0, 5).map(({ expression, distillery }, index) => (
              <Link
                key={expression.id}
                href={`/bottle/${expression.slug}`}
                className="flex gap-3 p-3 bg-surface rounded-card border border-border items-center"
              >
                <div className="w-7 h-7 flex-shrink-0 rounded-full bg-surface-light flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">{index + 1}</span>
                </div>
                <div className="w-10 h-14 flex-shrink-0 rounded overflow-hidden bg-surface-light flex items-center justify-center">
                  <BottleImage src={expression.imageUrl} alt={expression.name} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary truncate">{expression.name}</h3>
                  <p className="text-xs text-text-secondary">{distillery.name}</p>
                </div>
                {expression.avgCommunityScore && (
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-sm font-bold text-text-primary">
                      {Math.round(expression.avgCommunityScore)}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-card bg-surface border border-border p-5 text-center">
            <Star className="w-8 h-8 text-accent/30 mx-auto mb-2" strokeWidth={1} />
            <p className="text-xs text-text-muted">No ratings yet. Be the first to review!</p>
          </div>
        )}
      </section>

      <section className="px-5 mb-7">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-accent" strokeWidth={1.5} />
            <h2 className="text-base font-bold text-text-primary">By Region</h2>
          </div>
          <Link href="/explore/regions" className="text-[12px] text-accent font-medium">See All</Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {REGIONS.map((region) => (
            <Link
              key={region.value}
              href={`/explore/region/${region.value}`}
              className="p-3.5 bg-surface rounded-card border border-border hover:border-accent/50 active:border-accent/50 active:scale-[0.98] transition-colors"
            >
              <h3 className="text-sm font-bold text-text-primary">{region.label}</h3>
              <p className="text-[11px] text-text-muted mt-0.5">{region.country}</p>
              <p className="text-[11px] text-accent/80 mt-1 font-medium">{region.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <BottomNav active="explore" />
    </div>
  )
}
