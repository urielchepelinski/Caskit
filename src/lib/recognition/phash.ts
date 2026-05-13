export function computePerceptualHash(imageBuffer: Buffer): string {
  // Placeholder: will use image-hash library
  // Returns 64-character hex string representing the perceptual hash
  throw new Error('Not implemented: requires image-hash dependency')
}

export function compareHashes(hash1: string, hash2: string): number {
  // Compute Hamming distance between two hex hash strings
  if (hash1.length !== hash2.length) {
    throw new Error('Hash lengths must match')
  }

  let distance = 0
  for (let i = 0; i < hash1.length; i++) {
    const xor = parseInt(hash1[i], 16) ^ parseInt(hash2[i], 16)
    // Count bits set in XOR result
    let bits = xor
    while (bits > 0) {
      distance += bits & 1
      bits >>= 1
    }
  }
  return distance
}

export const HASH_MATCH_THRESHOLD = 10
