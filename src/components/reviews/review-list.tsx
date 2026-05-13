import { Star, ThumbsUp, ThumbsDown } from 'lucide-react'

interface Review {
  id: number
  score: number
  nose: string | null
  palate: string | null
  finish: string | null
  liked: boolean | null
  createdAt: Date
  user: { name: string | null; avatarUrl: string | null }
}

interface ReviewListProps {
  reviews: Review[]
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-text-muted text-center py-4">
        No reviews yet. Be the first to rate this whiskey!
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 bg-surface rounded-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-border flex items-center justify-center overflow-hidden">
                {review.user.avatarUrl ? (
                  <img src={review.user.avatarUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-bold text-text-muted">
                    {review.user.name?.charAt(0) || '?'}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{review.user.name || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs font-bold">{review.score}</span>
              <span className="text-[10px] text-text-muted">/100</span>
            </div>
          </div>

          {review.nose && (
            <div className="mb-1.5">
              <span className="text-[10px] font-semibold text-text-muted uppercase">Nose: </span>
              <span className="text-xs text-text-secondary">{review.nose}</span>
            </div>
          )}
          {review.palate && (
            <div className="mb-1.5">
              <span className="text-[10px] font-semibold text-text-muted uppercase">Palate: </span>
              <span className="text-xs text-text-secondary">{review.palate}</span>
            </div>
          )}
          {review.finish && (
            <div className="mb-1.5">
              <span className="text-[10px] font-semibold text-text-muted uppercase">Finish: </span>
              <span className="text-xs text-text-secondary">{review.finish}</span>
            </div>
          )}

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
            <span className="text-[10px] text-text-muted">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
            {review.liked !== null && (
              <span className="flex items-center gap-1 text-[10px]">
                {review.liked ? (
                  <><ThumbsUp className="w-3 h-3 text-green-600" /> Would buy again</>
                ) : (
                  <><ThumbsDown className="w-3 h-3 text-red-500" /> Would not rebuy</>
                )}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
