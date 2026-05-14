import { db } from '@/db'
import { expressions, bottles, distilleries, reviews, users } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { FlavorBar } from '@/components/ui/flavor-bar'
import { SectionLabel } from '@/components/ui/section-label'
import { BottomNav } from '@/components/layout/bottom-nav'
import { BottleImage } from '@/components/bottle/bottle-image'
import { BottleActions } from '@/components/bottle/bottle-actions'
import { ReviewList } from '@/components/reviews/review-list'
import { ArrowLeft, Star } from 'lucide-react'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BottleDetailPage({ params }: Props) {
  const { slug } = await params

  let result: any[] = []
  try {
    result = await db.select({
      expression: expressions,
      bottle: bottles,
      distillery: distilleries,
    })
      .from(expressions)
      .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
      .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
      .where(eq(expressions.slug, slug))
      .limit(1)
  } catch {
    return notFound()
  }

  if (!result[0]) return notFound()

  const { expression, bottle, distillery } = result[0]

  // Fetch community reviews
  let expressionReviews: Array<{
    id: number; score: number; nose: string | null; palate: string | null
    finish: string | null; liked: boolean | null; createdAt: Date
    user: { name: string | null; avatarUrl: string | null }
  }> = []
  try {
    const reviewRows = await db.select({
      review: reviews,
      user: { name: users.name, avatarUrl: users.avatarUrl },
    })
      .from(reviews)
      .innerJoin(users, eq(reviews.userId, users.id))
      .where(eq(reviews.expressionId, expression.id))
      .orderBy(desc(reviews.createdAt))
      .limit(20)

    expressionReviews = reviewRows.map(r => ({
      id: r.review.id,
      score: r.review.score,
      nose: r.review.nose,
      palate: r.review.palate,
      finish: r.review.finish,
      liked: r.review.liked,
      createdAt: r.review.createdAt,
      user: r.user,
    }))
  } catch {}

  const flavors = (expression.flavorProfile ?? {}) as Record<string, number>

  const flavorEntries = Object.entries(flavors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 7)

  return (
    <div className="min-h-screen bg-background text-text-primary pb-10">
      <div className="flex justify-between items-center px-5 py-3 sticky top-0 bg-background z-10">
        <Link href="/">
          <ArrowLeft className="w-[22px] h-[22px] text-text-muted" strokeWidth={1.5} />
        </Link>
        <div />
      </div>

      <div className="flex flex-col items-center px-5 py-5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,rgba(200,151,76,0.08),transparent_70%)]" />
        <div className="w-[120px] h-[200px] mb-5 relative z-10">
          <BottleImage
            src={expression.imageUrl}
            alt={expression.name}
            className="w-full h-full object-contain drop-shadow-2xl"
            placeholderClassName="w-[80px] h-[160px] mx-auto"
          />
        </div>
        <h1 className="font-display text-2xl font-bold text-center mb-1.5 relative z-10">
          {expression.name}
        </h1>
        <p className="text-[13px] text-text-muted text-center relative z-10">
          {distillery.name} · {bottle.type === 'scotch' ? 'Scotch' : bottle.type === 'world' ? 'World' : bottle.type} {bottle.category === 'single_malt' ? 'Single Malt' : bottle.category}
        </p>
      </div>

      {expression.story && (
        <div className="px-5 mb-6">
          <div className="font-story italic text-sm leading-relaxed text-text-muted p-4 pl-6 bg-surface rounded-xl border-l-[3px] border-accent">
            {expression.story}
          </div>
        </div>
      )}

      <div className="px-5 mb-6">
        <SectionLabel>Scores & Awards</SectionLabel>
        <div className="flex gap-2.5">
          {expression.avgCommunityScore && (
            <div className="flex-1 bg-surface rounded-xl p-3.5 text-center border border-[rgba(200,151,76,0.1)]">
              <div className="font-display text-[28px] font-bold text-accent mb-0.5">
                {Math.round(expression.avgCommunityScore)}<span className="text-[14px] text-text-muted font-normal">/100</span>
              </div>
              <div className="text-[10px] text-text-secondary uppercase tracking-wide">Community</div>
              <div className="text-[10px] text-text-secondary mt-0.5">{expression.reviewCount} ratings</div>
            </div>
          )}
        </div>
      </div>

      {flavorEntries.length > 0 && (
        <div className="px-5 mb-6">
          <SectionLabel>Flavor Profile</SectionLabel>
          <div className="bg-surface rounded-xl p-5 border border-[rgba(200,151,76,0.1)] space-y-3">
            {flavorEntries.map(([name, value]) => (
              <FlavorBar key={name} name={name} value={value} />
            ))}
          </div>
        </div>
      )}

      <div className="px-5 mb-6">
        <SectionLabel>Details</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {expression.abv && (
            <DetailItem label="ABV" value={`${expression.abv}%`} />
          )}
          {expression.ageYears && (
            <DetailItem label="Age" value={`${expression.ageYears} Years`} />
          )}
          {expression.caskType && (
            <DetailItem label="Cask" value={expression.caskType} />
          )}
          {distillery.region && (
            <DetailItem label="Region" value={`${distillery.region}, ${distillery.country}`} />
          )}
          {expression.naturalColor !== null && (
            <DetailItem label="Color" value={expression.naturalColor ? 'Natural' : 'Added'} />
          )}
          {expression.chillFiltered !== null && (
            <DetailItem label="Filtration" value={expression.chillFiltered ? 'Chill-Filtered' : 'Non Chill-Filtered'} />
          )}
        </div>
      </div>

      <div className="px-5 mb-6">
        <SectionLabel>Community Reviews</SectionLabel>
        <ReviewList reviews={expressionReviews} />
      </div>

      <BottleActions
        expressionId={expression.id}
        expressionName={expression.name}
        slug={slug}
      />

      <BottomNav />
    </div>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface rounded-lg p-3">
      <div className="text-[10px] text-text-secondary uppercase tracking-wide mb-1">{label}</div>
      <div className="text-[13px] font-medium text-text-primary">{value}</div>
    </div>
  )
}
