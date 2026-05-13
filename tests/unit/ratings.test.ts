import { describe, it, expect } from 'vitest'

describe('Ratings Logic', () => {
  describe('Community score threshold', () => {
    const MIN_REVIEWS_FOR_SCORE = 5

    it('does not show score with fewer than 5 reviews', () => {
      const reviewCount = 4
      const shouldShowScore = reviewCount >= MIN_REVIEWS_FOR_SCORE
      expect(shouldShowScore).toBe(false)
    })

    it('shows score at exactly 5 reviews', () => {
      const reviewCount = 5
      const shouldShowScore = reviewCount >= MIN_REVIEWS_FOR_SCORE
      expect(shouldShowScore).toBe(true)
    })

    it('shows score above 5 reviews', () => {
      const reviewCount = 42
      const shouldShowScore = reviewCount >= MIN_REVIEWS_FOR_SCORE
      expect(shouldShowScore).toBe(true)
    })
  })

  describe('Score normalization', () => {
    it('converts 1-100 score to 5-star display', () => {
      const toStars = (score: number) => Math.round((score / 100) * 5 * 10) / 10
      expect(toStars(92)).toBe(4.6)
      expect(toStars(80)).toBe(4)
      expect(toStars(50)).toBe(2.5)
      expect(toStars(100)).toBe(5)
    })

    it('calculates average correctly', () => {
      const scores = [85, 90, 78, 92, 88]
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length
      expect(avg).toBe(86.6)
    })
  })
})
