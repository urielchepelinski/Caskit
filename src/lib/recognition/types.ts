export type PipelineStage = 'cache' | 'classifier' | 'ocr' | 'vision_api' | 'manual'

export interface RecognitionResult {
  expressionId: number | null
  confidence: number
  method: PipelineStage
  rawData?: Record<string, unknown>
  suggestions?: { expressionId: number; name: string; slug: string; confidence: number }[]
}

export interface VisionApiResponse {
  distillery: string
  bottle_name: string
  expression: string
  age_years: number | null
  abv: number | null
  volume_ml: number | null
  cask_type: string | null
  region: string
  country: string
  type: string
  category: string
  limited_edition: boolean
  confidence: number
}
