import { MapPin, CheckCircle } from 'lucide-react'
import { StarRating } from '@/components/ui/star-rating'

interface Distillery {
  name: string
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
    location: 'Distillery in Katzrin',
    imageUrl: 'https://www.golanispirit.com/cdn/shop/files/about-us.jpg?v=1684073125',
    logoText: 'GH',
    expressionCount: 18,
    rating: 3.9,
    ratingCount: '8,230',
    verified: true,
  },
]

export function DistillerySection() {
  return (
    <section className="px-5 mb-7">
      <div className="flex justify-between items-center mb-3.5">
        <h2 className="text-lg font-bold">Distilleries Near You</h2>
        <a href="/explore/distilleries" className="text-[13px] text-accent font-medium">View all</a>
      </div>
      <div className="flex items-center gap-1.5 mb-4 text-[13px] text-text-secondary">
        <MapPin className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} />
        Tel Aviv, Israel
      </div>

      <div className="flex gap-3.5 overflow-x-auto scrollbar-hide -mx-5 px-5">
        {distilleries.map((d) => (
          <DistilleryCard key={d.name} distillery={d} />
        ))}
      </div>
    </section>
  )
}

function DistilleryCard({ distillery }: { distillery: Distillery }) {
  return (
    <div className="min-w-[240px] bg-white rounded-card overflow-hidden shadow-card border border-border">
      <div
        className="w-full h-[140px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${distillery.imageUrl})` }}
      >
        <div className="absolute top-3 left-3 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
          {distillery.logoUrl ? (
            <img src={distillery.logoUrl} alt={distillery.name} className="w-9 h-9 object-contain" />
          ) : (
            <span className="text-[11px] font-bold text-text-primary">{distillery.logoText}</span>
          )}
        </div>
      </div>
      <div className="p-3.5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-base font-bold">{distillery.name}</span>
          {distillery.verified && (
            <span className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <CheckCircle className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
            </span>
          )}
        </div>
        <p className="text-xs text-text-secondary mb-1.5">{distillery.location}</p>
        <p className="text-xs text-text-secondary mb-2">
          <strong className="text-text-primary">{distillery.expressionCount}</strong> Expressions
        </p>
        <StarRating rating={distillery.rating} count={distillery.ratingCount} />
        <button className="block w-full mt-3 py-2.5 bg-text-primary text-white rounded-sm text-[13px] font-semibold text-center">
          Discover the Distillery
        </button>
      </div>
    </div>
  )
}
