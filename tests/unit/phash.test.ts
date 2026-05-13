import { describe, it, expect } from 'vitest'
import { compareHashes, HASH_MATCH_THRESHOLD } from '@/lib/recognition/phash'

describe('Perceptual Hash', () => {
  describe('compareHashes', () => {
    it('returns 0 for identical hashes', () => {
      const hash = 'a1b2c3d4e5f67890a1b2c3d4e5f67890'
      expect(compareHashes(hash, hash)).toBe(0)
    })

    it('returns correct Hamming distance for different hashes', () => {
      // Single hex digit difference: 0 vs 1 = 1 bit difference
      const hash1 = '0000000000000000'
      const hash2 = '1000000000000000'
      expect(compareHashes(hash1, hash2)).toBe(1)
    })

    it('returns high distance for very different hashes', () => {
      const hash1 = '0000000000000000'
      const hash2 = 'ffffffffffffffff'
      expect(compareHashes(hash1, hash2)).toBe(64)
    })

    it('identifies matching bottles within threshold', () => {
      // Simulate two photos of same bottle with minor differences
      const hash1 = 'a1b2c3d4e5f67890'
      const hash2 = 'a1b2c3d4e5f67891' // last char differs by 1 bit
      const distance = compareHashes(hash1, hash2)
      expect(distance).toBeLessThanOrEqual(HASH_MATCH_THRESHOLD)
    })

    it('rejects different bottles above threshold', () => {
      const hash1 = '0000000000000000'
      const hash2 = 'ff00ff00ff00ff00'
      const distance = compareHashes(hash1, hash2)
      expect(distance).toBeGreaterThan(HASH_MATCH_THRESHOLD)
    })

    it('throws for mismatched hash lengths', () => {
      expect(() => compareHashes('abc', 'abcdef')).toThrow('Hash lengths must match')
    })
  })
})
