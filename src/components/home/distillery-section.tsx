import { MapPin, CheckCircle } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'
import Link from 'next/link'
import { HorizontalScroller } from '@/components/ui/horizontal-scroller'

interface Distillery {
  name: string
  slug: string
  location: string
  imageUrl: string
  logoUrl?: string
  logoText?: string
  expressionCount: number
  rating: number
  ratingCount: string
  verified: boolean
}

const distilleries: Distillery[] = [
  {
    name: 'Milk & Honey',
    slug: 'milk-and-honey',
    location: 'Distillery in Tel Aviv',
    imageUrl: 'https://mh-distillery.com/wp-content/uploads/2023/01/Series-banner_1920x723-apex-terroir.jpg',
    logoUrl: 'https://mh-distillery.com/wp-content/uploads/2022/07/logo-vector.svg',
    expressionCount: 24,
    rating: 4.2,
    ratingCount: '12,450',
    verified: true,
  },
  {
    name: 'Golan Heights',
    slug: 'golan-heights',
    location: 'Distillery in Katzrin',
    imageUrl: 'https://www.golanispirit.com/cdn/shop/files/about-us.jpg?v=1684073125',
    logoText: 'GH',
    expressionCount: 18,
    rating: 3.9,
    ratingCount: '8,230',
    verified: true,
  },
  {
    name: 'Pelter',
    slug: 'pelter',
    location: 'Distillery in Upper Galilee',
    imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&h=300&fit=crop',
    logoText: 'PL',
    expressionCount: 12,
    rating: 4.0,
    ratingCount: '5,120',
    verified: true,
  },
  {
    name: 'Legends',
    slug: 'legends',
    location: 'Distillery in Caesarea',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=300&fit=crop',
    logoText: 'LG',
    expressionCount: 8,
    rating: 3.8,
    ratingCount: '2,340',
    verified: true,
  },
  {
    name: 'Akko Arak',
    slug: 'akko-arak',
    location: 'Distillery in Acre',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=300&fit=crop',
    logoText: 'AA',
    expressionCount: 6,
    rating: 3.7,
    ratingCount: '1,890',
    verified: false,
  },
]

export function DistillerySection() {
  return (
    <section className="mb-7">
      <div className="flex justify-between items-center mb-3.5 px-5">
        <h2 className="text-lg font-bold text-text-primary">Distilleries Near You</h2>
        <Link href="/explore/distilleries" className="text-[13px] text-accent font-medium">View All</Link>
      </div>
      <div className="flex items-center gap-1.5 mb-4 text-[13px] text-text-secondary px-5">
        <MapPin className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
        Tel Aviv, Israel
      </div>

      <HorizontalScroller>
        {distilleries.map((d) => (
          <DistilleryCard key={d.name} distillery={d} />
        ))}
      </HorizontalScroller>
    </section>
  )
}

function DistilleryCard({ distillery }: { distillery: Distillery }) {
  return (
    <Link
      href={`/distillery/${distillery.slug}`}
      className="min-w-[260px] max-w-[260px] bg-surface rounded-card overflow-hidden shadow-card border border-border flex-shrink-0 block"
    >
      <div
        className="w-full h-[120px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${distillery.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute top-3 left-3 w-10 h-10 bg-surface rounded-full flex items-center justify-center shadow-lg overflow-hidden border border-border">
          {distillery.logoUrl ? (
            <img src={distillery.logoUrl} alt={distillery.name} className="w-7 h-7 object-contain" />
          ) : (
            <span className="text-[10px] font-bold text-text-primary">{distillery.logoText}</span>
          )}
        </div>
      </div>
      <div className="p-3.5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-sm font-bold text-text-primary">{distillery.name}</span>
          {distillery.verified && (
            <span className="w-3.5 h-3.5 bg-accent rounded-full flex items-center justify-center">
              <CheckCircle className="w-2 h-2 text-background" strokeWidth={2.5} />
            </span>
          )}
        </div>
        <p className="text-[11px] text-text-secondary mb-1.5">{distillery.location}</p>
        <p className="text-[11px] text-text-muted mb-2">
          <strong className="text-text-primary">{distillery.expressionCount}</strong> Expressions
        </p>
        <StarRating rating={distillery.rating} count={distillery.ratingCount} size="sm" />
      </div>
    </Link>
  )
}
