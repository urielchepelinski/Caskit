'use client'

import { useState } from 'react'
import { Plus, Pencil, Share2, Star, Check } from 'lucide-react'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { useToast } from '@/components/ui/toast'

interface BottleActionsProps {
  expressionId: number
  expressionName: string
  slug: string
}

export function BottleActions({ expressionId, expressionName, slug }: BottleActionsProps) {
  const { toast } = useToast()
  const [showCollection, setShowCollection] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const handleAddToCollection = async (status: 'owned' | 'wishlist' | 'tasted') => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expressionId, status }),
      })
      if (res.ok) {
        toast(`Added to ${status}!`, 'success')
        setShowCollection(false)
      } else {
        const data = await res.json()
        toast(data.error === 'Unauthorized' ? 'Sign in to add to collection' : 'Failed to add', 'error')
      }
    } catch {
      toast('Something went wrong', 'error')
    }
    setSubmitting(false)
  }

  const handleRate = async () => {
    if (rating === 0) return
    setSubmitting(true)
    try {
      const score = rating * 20 // convert 1-5 stars to 20-100 scale
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expressionId, score }),
      })
      if (res.ok) {
        toast('Rating submitted!', 'success')
        setShowRating(false)
        setRating(0)
      } else {
        const data = await res.json()
        toast(data.error === 'Unauthorized' ? 'Sign in to rate' : 'Failed to submit', 'error')
      }
    } catch {
      toast('Something went wrong', 'error')
    }
    setSubmitting(false)
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/bottle/${slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title: expressionName, text: `Check out ${expressionName} on Caskit`, url })
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url)
      toast('Link copied!', 'info')
    }
  }

  return (
    <>
      <div className="px-5 pb-24 flex flex-col gap-2.5">
        <button
          onClick={() => setShowCollection(true)}
          className="w-full py-4 bg-accent text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-[18px] h-[18px]" strokeWidth={2} />
          Add to Collection
        </button>
        <div className="flex gap-2.5">
          <button
            onClick={() => setShowRating(true)}
            className="flex-1 py-4 bg-transparent text-accent border-[1.5px] border-[#A67B3D] rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >
            <Pencil className="w-[18px] h-[18px]" strokeWidth={1.5} />
            Rate
          </button>
          <button
            onClick={handleShare}
            className="flex-1 py-4 bg-transparent text-accent border-[1.5px] border-[#A67B3D] rounded-xl text-sm font-medium flex items-center justify-center gap-2"
          >
            <Share2 className="w-[18px] h-[18px]" strokeWidth={1.5} />
            Share
          </button>
        </div>
      </div>

      <BottomSheet open={showCollection} onClose={() => setShowCollection(false)} title="Add to Collection">
        <div className="space-y-3">
          {(['owned', 'wishlist', 'tasted'] as const).map((status) => (
            <button
              key={status}
              onClick={() => handleAddToCollection(status)}
              disabled={submitting}
              className="w-full flex items-center gap-3 p-4 bg-surface rounded-xl border border-border hover:border-accent transition-colors disabled:opacity-50"
            >
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                {status === 'owned' && <Check className="w-5 h-5 text-accent" />}
                {status === 'wishlist' && <Star className="w-5 h-5 text-accent" />}
                {status === 'tasted' && <Pencil className="w-5 h-5 text-accent" />}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold capitalize">{status === 'owned' ? 'I Own This' : status === 'wishlist' ? 'Wishlist' : 'I\'ve Tasted This'}</div>
                <div className="text-xs text-text-muted">
                  {status === 'owned' ? 'Add to your shelf' : status === 'wishlist' ? 'Save for later' : 'Mark as tried'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </BottomSheet>

      <BottomSheet open={showRating} onClose={() => setShowRating(false)} title="Rate This Whiskey">
        <div className="flex flex-col items-center py-4">
          <p className="text-sm text-text-secondary mb-4 text-center">{expressionName}</p>
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className={`w-10 h-10 ${star <= rating ? 'fill-accent text-accent' : 'text-border'}`}
                  strokeWidth={1.5}
                />
              </button>
            ))}
          </div>
          <button
            onClick={handleRate}
            disabled={rating === 0 || submitting}
            className="w-full py-3 bg-accent text-white rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </button>
        </div>
      </BottomSheet>
    </>
  )
}
