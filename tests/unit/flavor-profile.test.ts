import { describe, it, expect } from 'vitest'

describe('Flavor Profile', () => {
  const FLAVOR_DIMENSIONS = [
    'smoky', 'peaty', 'fruity', 'floral', 'spicy',
    'sweet', 'oaky', 'maritime', 'vanilla', 'chocolate'
  ]

  it('has exactly 10 dimensions', () => {
    expect(FLAVOR_DIMENSIONS).toHaveLength(10)
  })

  it('all values are between 0 and 10', () => {
    const profile = { smoky: 7, peaty: 8, fruity: 3, floral: 2, spicy: 5, sweet: 4, oaky: 6, maritime: 7, vanilla: 3, chocolate: 2 }
    Object.values(profile).forEach(value => {
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThanOrEqual(10)
    })
  })

  it('can sort flavors by intensity (descending)', () => {
    const profile = { smoky: 7, peaty: 8, fruity: 3, floral: 2, spicy: 5, sweet: 4, oaky: 6, maritime: 7, vanilla: 3, chocolate: 2 }
    const sorted = Object.entries(profile).sort(([, a], [, b]) => b - a)
    expect(sorted[0][0]).toBe('peaty')
    expect(sorted[0][1]).toBe(8)
    expect(sorted[sorted.length - 1][1]).toBe(2)
  })

  it('top 7 flavors for display (bottle detail screen)', () => {
    const profile = { smoky: 7, peaty: 8, fruity: 3, floral: 2, spicy: 5, sweet: 4, oaky: 6, maritime: 7, vanilla: 3, chocolate: 2 }
    const topFlavors = Object.entries(profile)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 7)
    expect(topFlavors).toHaveLength(7)
    expect(topFlavors[0][0]).toBe('peaty')
  })

  it('calculates flavor similarity between two bottles', () => {
    const profile1 = { smoky: 8, peaty: 8, fruity: 3, sweet: 4 }
    const profile2 = { smoky: 7, peaty: 9, fruity: 2, sweet: 5 }

    // Euclidean distance
    const keys = Object.keys(profile1) as (keyof typeof profile1)[]
    const distance = Math.sqrt(
      keys.reduce((sum, key) => sum + Math.pow((profile1[key] || 0) - (profile2[key] || 0), 2), 0)
    )

    // Similar bottles should have low distance
    expect(distance).toBeLessThan(5)
  })
})
