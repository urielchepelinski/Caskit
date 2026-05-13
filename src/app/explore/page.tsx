import { db } from '@/db'
import { expressions, bottles, distilleries, awardScores } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import Link from 'next/link'

const TYPES = [
  { value: 'scotch', label: 'Scotch', icon: 'SC' },
  { value: 'bourbon', label: 'Bourbon', icon: 'BR' },
  { value: 'rye', label: 'Rye', icon: 'RY' },
  { value: 'irish', label: 'Irish', icon: 'IR' },
  { value: 'japanese', label: 'Japanese', icon: 'JP' },
  { value: 'world', label: 'World', icon: 'WD' },
]

const MOODS = [
  { value: 'smoky', label: 'Smoky & Peaty', color: 'bg-amber-900/10' },
  { value: 'sweet', label: 'Sweet & Smooth', color: 'bg-amber-400/10' },
  { value: 'fruity', label: 'Fruity & Light', color: 'bg-green-400/10' },
  { value: 'spicy', label: 'Spicy & Bold', color: 'bg-red-400/10' },
]

export default async function ExplorePage() {
  const topRated = await db.select({
    expression: expressions,
    bottle: bottles,
    distillery: distilleries,
  })
    .from(expressions)
    .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
    .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
    .orderBy(desc(expressions.avgCommunityScore))
    .limit(5)

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <section className="px-5 mb-6">
        <h2 className="text-lg font-bold mb-3">Browse by Style</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {TYPES.map((type) => (
            <Link
              key={type.value}
              href={`/explore/${type.value}`}
              className="flex flex-col items-center gap-1.5 p-3 bg-surface rounded-card border border-border"
            >
              <span className="text-base font-bold text-accent">{type.icon}</span>
              <span className="text-xs font-medium text-text-secondary">{type.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 mb-6">
        <h2 className="text-lg font-bold mb-3">I'm in the mood for...</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {MOODS.map((mood) => (
            <Link
              key={mood.value}
              href={`/explore/mood/${mood.value}`}
              className={`p-4 rounded-card border border-border ${mood.color}`}
            >
              <span className="text-sm font-medium">{mood.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold">Top Rated</h2>
          <Link href="/explore/top" className="text-[13px] text-accent font-medium">See all</Link>
        </div>
        <div className="space-y-3">
          {topRated.map(({ expression, bottle, distillery }) => (
            <Link
              key={expression.id}
              href={`/bottle/${expression.slug}`}
              className="flex gap-3 p-3 bg-white rounded-card shadow-card border border-border items-center"
            >
              {expression.imageUrl && (
                <div className="w-12 h-18 flex-shrink-0 rounded-lg overflow-hidden bg-surface flex items-center justify-center">
                  <img src={expression.imageUrl} alt={expression.name} className="h-16 w-auto object-contain" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{expression.name}</h3>
                <p className="text-xs text-text-secondary">{distillery.name}</p>
                {expression.avgCommunityScore && (
                  <p className="text-xs text-accent font-semibold mt-1">
                    {Math.round(expression.avgCommunityScore)} / 100
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <BottomNav active="explore" />
    </div>
  )
}
