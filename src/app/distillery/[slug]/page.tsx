import { db } from '@/db'
import { distilleries, bottles, expressions } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { StarRating } from '@/components/ui/star-rating'
import { MapPin, Globe, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function DistilleryPage({ params }: Props) {
  const { slug } = await params

  const [distillery] = await db.select()
    .from(distilleries)
    .where(eq(distilleries.slug, slug))
    .limit(1)

  if (!distillery) return notFound()

  const bottleList = await db.select({
    bottle: bottles,
    expression: expressions,
  })
    .from(bottles)
    .innerJoin(expressions, eq(expressions.bottleId, bottles.id))
    .where(eq(bottles.distilleryId, distillery.id))

  return (
    <div className="min-h-screen bg-background pb-20">
      {distillery.imageUrl && (
        <div
          className="w-full h-48 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${distillery.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      <div className="px-5 -mt-12 relative z-10">
        <div className="bg-white rounded-card shadow-elevated border border-border p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-xl font-bold">{distillery.name}</h1>
            {distillery.verified && (
              <span className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" strokeWidth={2.5} />
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-sm text-text-secondary mb-3">
            <MapPin className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
            {distillery.region}, {distillery.country}
          </div>

          {distillery.description && (
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              {distillery.description}
            </p>
          )}

          {distillery.website && (
            <a
              href={distillery.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-accent font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              Visit Website
            </a>
          )}
        </div>

        <h2 className="text-lg font-bold mb-3">
          Expressions ({bottleList.length})
        </h2>

        <div className="space-y-3">
          {bottleList.map(({ bottle, expression }) => (
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
                <p className="text-xs text-text-secondary">
                  {bottle.category === 'single_malt' ? 'Single Malt' : bottle.category}
                  {expression.abv && ` \u00b7 ${expression.abv}%`}
                </p>
                {expression.avgCommunityScore && (
                  <StarRating rating={Number((expression.avgCommunityScore / 20).toFixed(1))} count={String(expression.reviewCount)} size="sm" />
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BottomNav active="explore" />
    </div>
  )
}
