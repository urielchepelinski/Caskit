export interface ReviewInput {
  expressionId: number
  score: number
  nose?: string
  palate?: string
  finish?: string
  liked?: boolean
}

export interface ReviewWithUser {
  id: number
  score: number
  nose: string | null
  palate: string | null
  finish: string | null
  liked: boolean | null
  createdAt: Date
  user: {
    name: string | null
    avatarUrl: string | null
  }
}
