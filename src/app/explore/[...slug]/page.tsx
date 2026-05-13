import { db } from '@/db'
import { expressions, bottles, distilleries } from '@/db/schema'
import { eq, desc, ilike, isNotNull } from 'drizzle-orm'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string[] }>
}

const CATEGORY_NAMES: Record<string, string> = {
  scotch: 'Scotch Whisky',
  bourbon: 'Bourbon',
  rye: 'Rye Whiskey',
  irish: 'Irish Whiskey',
  japanese: 'Japanese Whisky',
  world: 'World Whisky',
}

const REGION_NAMES: Record<string, string> = {
  islay: 'Islay',
  speyside: 'Speyside',
  highland: 'Highland',
  kentucky: 'Kentucky',
  campbeltown: 'Campbeltown',
  lowland: 'Lowland',
}

export default async function ExploreSubPage({ params }: Props) {
  const { slug } = await params
  const [first, second] = slug

  let title = 'Explore'
  let results: Array<{
    expression: typeof expressions.$inferSelect
    bottle: typeof bottles.$inferSelect
    distillery: typeof distilleries.$inferSelect
  }> = []

  try {
    if (first === 'top') {
      title = 'Top Rated'
      results = await db.select({ expression: expressions, bottle: bottles, distillery: distilleries })
        .from(expressions)
        .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
        .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
        .where(isNotNull(expressions.avgCommunityScore))
        .orderBy(desc(expressions.avgCommunityScore))
        .limit(20)
    } else if (first === 'region' && second) {
      title = REGION_NAMES[second] || second.charAt(0).toUpperCase() + second.slice(1)
      results = await db.select({ expression: expressions, bottle: bottles, distillery: distilleries })
        .from(expressions)
        .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
        .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
        .where(ilike(distilleries.region, `%${second}%`))
        .orderBy(desc(expressions.avgCommunityScore))
        .limit(20)
    } else if (first === 'regions') {
      title = 'All Regions'
      results = await db.select({ expression: expressions, bottle: bottles, distillery: distilleries })
        .from(expressions)
        .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
        .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
        .orderBy(desc(expressions.avgCommunityScore))
        .limit(30)
    } else if (first === 'categories') {
      title = 'All Categories'
      results = await db.select({ expression: expressions, bottle: bottles, distillery: distilleries })
        .from(expressions)
        .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
        .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
        .orderBy(desc(expressions.avgCommunityScore))
        .limit(30)
    } else if (first === 'distilleries') {
      title = 'All Distilleries'
      results = await db.select({ expression: expressions, bottle: bottles, distillery: distilleries })
        .from(expressions)
        .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
        .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
        .orderBy(desc(expressions.avgCommunityScore))
        .limit(30)
    } else if (CATEGORY_NAMES[first]) {
      title = CATEGORY_NAMES[first]
      results = await db.select({ expression: expressions, bottle: bottles, distillery: distilleries })
        .from(expressions)
        .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
        .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
        .where(ilike(bottles.type, `%${first}%`))
        .orderBy(desc(expressions.avgCommunityScore))
        .limit(20)
    } else {
      title = first.charAt(0).toUpperCase() + first.slice(1)
      const searchTerm = `%${first}%`
      results = await db.select({ expression: expressions, bottle: bottles, distillery: distilleries })
        .from(expressions)
        .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
        .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
        .where(ilike(bottles.type, searchTerm))
        .orderBy(desc(expressions.avgCommunityScore))
        .limit(20)
    }
  } catch {
    results = []
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <div className="px-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href="/explore" className="p-1">
            <ArrowLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
          </Link>
          <h1 className="text-xl font-display font-bold text-text-primary">{title}</h1>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-sm">No results found</p>
            <Link href="/explore" className="text-accent text-sm mt-2 inline-block">Back to Explore</Link>
          </div>
        ) : (
          <div className="space-y-2.5">
            {results.map(({ expression, distillery: dist }, index) => (
              <Link
                key={expression.id}
                href={`/bottle/${expression.slug}`}
                className="flex gap-3 p-3 bg-surface rounded-card border border-border items-center"
              >
                <div className="w-7 h-7 flex-shrink-0 rounded-full bg-surface-light flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">{index + 1}</span>
                </div>
                {expression.imageUrl && (
                  <div className="w-10 h-14 flex-shrink-0 rounded overflow-hidden bg-surface-light flex items-center justify-center">
                    <img src={expression.imageUrl} alt={expression.name} className="h-[85%] w-auto object-contain" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary truncate">{expression.name}</h3>
                  <p className="text-xs text-text-secondary">{dist.name}</p>
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
        )}
      </div>
      <BottomNav active="explore" />
    </div>
  )
}
