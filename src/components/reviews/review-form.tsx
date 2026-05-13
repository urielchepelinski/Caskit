'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Send } from 'lucide-react'

interface ReviewFormProps {
  expressionId: number
  expressionName: string
  existingReview?: {
    score: number
    nose: string | null
    palate: string | null
    finish: string | null
    liked: boolean | null
  }
}

export function ReviewForm({ expressionId, expressionName, existingReview }: ReviewFormProps) {
  const router = useRouter()
  const [score, setScore] = useState(existingReview?.score ?? 75)
  const [nose, setNose] = useState(existingReview?.nose ?? '')
  const [palate, setPalate] = useState(existingReview?.palate ?? '')
  const [finish, setFinish] = useState(existingReview?.finish ?? '')
  const [liked, setLiked] = useState(existingReview?.liked ?? null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const starRating = (score / 20).toFixed(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          expressionId,
          score,
          nose: nose || undefined,
          palate: palate || undefined,
          finish: finish || undefined,
          liked,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit review')
      }

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-semibold mb-3">
          Your Score: <span className="text-accent">{score}/100</span>
          <span className="text-text-muted font-normal ml-2">({starRating} stars)</span>
        </label>
        <input
          type="range"
          min={1}
          max={100}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full h-2 bg-surface rounded-full appearance-none cursor-pointer accent-accent"
        />
        <div className="flex justify-between text-[10px] text-text-muted mt-1">
          <span>Poor</span>
          <span>Average</span>
          <span>Excellent</span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">Nose</label>
        <textarea
          value={nose}
          onChange={(e) => setNose(e.target.value)}
          placeholder="What aromas do you detect?"
          rows={2}
          className="w-full px-3 py-2 bg-surface border border-border rounded-sm text-sm resize-none focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">Palate</label>
        <textarea
          value={palate}
          onChange={(e) => setPalate(e.target.value)}
          placeholder="How does it taste?"
          rows={2}
          className="w-full px-3 py-2 bg-surface border border-border rounded-sm text-sm resize-none focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-1.5">Finish</label>
        <textarea
          value={finish}
          onChange={(e) => setFinish(e.target.value)}
          placeholder="How does it linger?"
          rows={2}
          className="w-full px-3 py-2 bg-surface border border-border rounded-sm text-sm resize-none focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-text-secondary mb-2">Would you buy again?</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLiked(true)}
            className={`flex-1 py-2 rounded-sm text-sm font-medium border ${
              liked === true ? 'bg-green-50 border-green-300 text-green-700' : 'bg-surface border-border text-text-secondary'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => setLiked(false)}
            className={`flex-1 py-2 rounded-sm text-sm font-medium border ${
              liked === false ? 'bg-red-50 border-red-300 text-red-700' : 'bg-surface border-border text-text-secondary'
            }`}
          >
            No
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-accent text-white rounded-card text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Submitting...' : existingReview ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  )
}
