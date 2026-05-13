import { db } from '@/db'
import { expressions, bottles, distilleries } from '@/db/schema'
import { eq, ilike, or, sql } from 'drizzle-orm'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import Link from 'next/link'
import { Star } from 'lucide-react'

interface Props {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() || ''

  let results: { expression: typeof expressions.$inferSelect; bottle: typeof bottles.$inferSelect; distillery: typeof distilleries.$inferSelect }[] = []

  if (query.length >= 2) {
    const pattern = `%${query}%`
    results = await db.select({
      expression: expressions,
      bottle: bottles,
      distillery: distilleries,
    })
      .from(expressions)
      .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
      .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
      .where(
        or(
          ilike(expressions.name, pattern),
          ilike(bottles.name, pattern),
          ilike(distilleries.name, pattern)
        )
      )
      .limit(20)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <div className="px-5">
        <form action="/search" method="GET" className="mb-4">
          <input
            name="q"
            type="text"
            defaultValue={query}
            placeholder="Search bottles, distilleries..."
            autoFocus
            className="w-full px-4 py-3 bg-surface border border-border rounded-card text-sm focus:outline-none focus:border-accent"
          />
        </form>

        {query && (
          <p className="text-xs text-text-muted mb-4">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        )}

        <div className="space-y-3">
          {results.map(({ expression, bottle, distillery }) => (
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
                <p className="text-xs text-text-secondary">{distillery.name} &middot; {bottle.type}</p>
                {expression.avgCommunityScore && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-xs font-semibold">{(expression.avgCommunityScore / 20).toFixed(1)}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}

          {query && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-muted text-sm">No bottles found matching &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-text-muted mt-2">Try a different spelling or scan the bottle instead</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  )
}
