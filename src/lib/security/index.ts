import type { ValidationResult, ImageValidationOptions } from './types'

const DANGEROUS_TAGS = /<\s*\/?\s*(script|iframe|object|embed|form|link|meta|style|svg|math|base)\b[^>]*>/gi
const EVENT_HANDLERS = /\s+on\w+\s*=\s*["'][^"']*["']/gi
const DANGEROUS_ATTRS = /\s+(href|src|action)\s*=\s*["']\s*javascript:/gi

export function sanitizeHtml(input: string): string {
  let clean = input
  clean = clean.replace(DANGEROUS_TAGS, '')
  clean = clean.replace(EVENT_HANDLERS, '')
  clean = clean.replace(DANGEROUS_ATTRS, '')
  return clean.trim()
}

const DEFAULT_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const DEFAULT_MAX_SIZE = 10 * 1024 * 1024

export function validateImageFile(
  file: { type: string; size: number },
  options?: ImageValidationOptions
): ValidationResult {
  const allowedTypes = options?.allowedMimeTypes ?? DEFAULT_ALLOWED_MIME_TYPES
  const maxSize = options?.maxSizeBytes ?? DEFAULT_MAX_SIZE

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Allowed: ${allowedTypes.join(', ')}`,
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max: ${(maxSize / 1024 / 1024).toFixed(0)}MB`,
    }
  }

  return { valid: true }
}

export function rateLimitKey(identifier: string, action: string): string {
  return `ratelimit:${action}:${identifier}`
}

export function isValidScore(score: unknown): score is number {
  if (typeof score !== 'number') return false
  if (!Number.isInteger(score)) return false
  return score >= 1 && score <= 100
}
