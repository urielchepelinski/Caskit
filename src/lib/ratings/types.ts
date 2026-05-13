export interface BottleScores {
  communityScore: number | null
  reviewCount: number
  awards: {
    competition: string
    year: number
    level: string
    score: number | null
  }[]
}
