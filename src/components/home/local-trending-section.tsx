import { TrendingUp } from 'lucide-react'
import { BottleImage } from '@/components/bottle/bottle-image'
import { Star } from 'lucide-react'
import Link from 'next/link'
import { HorizontalScroller } from '@/components/ui/horizontal-scroller'
import { getPopularInCountry } from '@/lib/geo/queries'
import { getCountryName, getCountryFlag } from '@/lib/geo'

interface Props {
  country: string | null
}

export async function LocalTrendingSection({ country }: Props) {
  let trendingBottles: Awaited<ReturnType<typeof getPopularInCountry>> = []

  try {
    trendingBottles = await getPopularInCountry(country, 8)
  } catch {
    trendingBottles = []
  }

  if (trendingBottles.length === 0) return null

  const title = country
    ? `Trending in ${getCountryName(country)}`
    : 'Trending Globally'

  const flag = country ? getCountryFlag(country) : ''

  return (
    <section className="mb-7">
      <div className="flex justify-between items-center mb-3.5 px-5">
        <h2 className="text-lg font-bold text-text-primary">
          {flag && <span className="mr-1.5">{flag}</span>}
          {title}
        </h2>
        <Link href="/explore/top" className="text-[13px] text-accent font-medium">View All</Link>
      </div>

      <HorizontalScroller>
        {trendingBottles.map(({ expression, distillery: dist }) => (
          <Link
            key={expression.id}
            href={`/bottle/${expression.slug}`}
            className="min-w-[160px] max-w-[160px] bg-surface rounded-card overflow-hidden shadow-card border border-border flex-shrink-0 block p-3"
          >
            <div className="w-full h-28 rounded-sm overflow-hidden bg-surface-light flex items-center justify-center mb-2">
              <BottleImage
                src={expression.imageUrl}
                alt={expression.name}
                className="h-[90%] w-auto object-contain"
                placeholderClassName="w-8 h-16"
              />
            </div>
            <h3 className="text-xs font-bold text-text-primary truncate">{expression.name}</h3>
            <p className="text-[10px] text-text-secondary truncate">{dist.name}</p>
            {expression.avgCommunityScore && (
              <div className="flex items-center gap-1 mt-1.5">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span className="text-xs font-bold text-text-primary">
                  {Math.round(expression.avgCommunityScore)}
                </span>
              </div>
            )}
          </Link>
        ))}
      </HorizontalScroller>
    </section>
  )
}
