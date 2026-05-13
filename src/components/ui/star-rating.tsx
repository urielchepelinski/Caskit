import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  count?: string
  size?: 'sm' | 'md'
}

export function StarRating({ rating, count, size = 'md' }: StarRatingProps) {
  const starSize = size === 'sm' ? 'w-[13px] h-[13px]' : 'w-3.5 h-3.5'
  const textSize = size === 'sm' ? 'text-[13px]' : 'text-sm'
  const countSize = size === 'sm' ? 'text-[11px]' : 'text-[11px]'

  return (
    <div className="flex items-center gap-1">
      <Star className={`${starSize} fill-accent text-accent`} />
      <strong className={`${textSize} font-bold`}>{rating}</strong>
      {count && <span className={`${countSize} text-text-muted`}>{count} ratings</span>}
    </div>
  )
}
