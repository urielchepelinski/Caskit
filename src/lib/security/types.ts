export interface ValidationResult {
  valid: boolean
  error?: string
}

export interface ImageValidationOptions {
  maxSizeBytes?: number
  allowedMimeTypes?: string[]
}

export interface SecurityHeader {
  key: string
  value: string
}

export interface RateLimitKeyParts {
  identifier: string
  action: string
}
