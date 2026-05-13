import { StarRating } from '@/components/ui/star-rating'

interface BottlePreview {
  name: string
  meta: string
  story: string
  imageUrl: string
  rating: number
  ratingCount: string
  slug: string
}

const topBottles: BottlePreview[] = [
  {
    name: 'M&H Apex Dead Sea',
    meta: 'Single Malt \u00b7 Terroir Series \u00b7 57.4%',
    story: '\u201cSweet French vanilla and mocha, a rush of warm cinnamon and coriander, long finish with candied ginger and sea salt...\u201d',
    imageUrl: 'https://mh-distillery.com/wp-content/uploads/2025/05/apex-dead-sea-terroir-874X918-1.png',
    rating: 4.6,
    ratingCount: '1,842',
    slug: 'mh-apex-dead-sea-terroir',
  },
  {
    name: 'M&H Apex Jerusalem',
    meta: 'Single Malt \u00b7 Terroir Series \u00b7 55.4%',
    story: '\u201cBright green apples with citrus leaf and subtle oak, fresh pine, toffee apple finish...\u201d',
    imageUrl: 'https://mh-distillery.com/wp-content/uploads/2025/05/apex-jerusalem-terroir-874X918-1.png',
    rating: 4.4,
    ratingCount: '956',
    slug: 'mh-apex-jerusalem-terroir',
  },
  {
    name: 'Pelter Single Malt 10Y',
    meta: 'Single Malt \u00b7 Bourbon Cask \u00b7 46%',
    story: '\u201cA decade of Golan Heights maturation, pecan pie, lemon drizzle cake, warm oak and honey...\u201d',
    imageUrl: 'https://media.getmood.io/warehouse/dynamic/731109.jpg',
    rating: 4.3,
    ratingCount: '412',
    slug: 'pelter-single-malt-10y',
  },
]

export function TopBottlesSection() {
  return (
    <section className="px-5 mb-7">
      <div className="flex justify-between items-center mb-3.5">
        <h2 className="text-lg font-bold">Top in Israel</h2>
        <a href="/explore/top" className="text-[13px] text-accent font-medium">See all</a>
      </div>

      <div className="flex flex-col gap-3">
        {topBottles.map((bottle) => (
          <BottleCard key={bottle.slug} bottle={bottle} />
        ))}
      </div>
    </section>
  )
}

function BottleCard({ bottle }: { bottle: BottlePreview }) {
  return (
    <a
      href={`/bottle/${bottle.slug}`}
      className="flex gap-3.5 p-3 bg-white rounded-card shadow-card border border-border items-center"
    >
      <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface flex items-center justify-center">
        <img
          src={bottle.imageUrl}
          alt={bottle.name}
          className="h-[90%] w-auto object-contain"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold mb-0.5 truncate">{bottle.name}</h3>
        <p className="text-xs text-text-secondary mb-1.5">{bottle.meta}</p>
        <p className="font-story italic text-[11px] text-text-muted leading-[1.4] line-clamp-2">
          {bottle.story}
        </p>
        <div className="mt-1.5">
          <StarRating rating={bottle.rating} count={bottle.ratingCount} size="sm" />
        </div>
      </div>
    </a>
  )
}
