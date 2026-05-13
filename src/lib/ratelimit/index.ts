import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

function getRedis() {
  if (!process.env.UPSTASH_REDIS_URL || !process.env.UPSTASH_REDIS_TOKEN) {
    return null
  }
  return new Redis({
    url: process.env.UPSTASH_REDIS_URL,
    token: process.env.UPSTASH_REDIS_TOKEN,
  })
}

function createLimiter(limit: number, window: string, prefix: string) {
  const redis = getRedis()
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window as Parameters<typeof Ratelimit.slidingWindow>[1]),
    prefix,
  })
}

export const reviewRateLimit = createLimiter(10, '1 h', 'ratelimit:review')
export const scanRateLimit = createLimiter(30, '1 h', 'ratelimit:scan')
export const apiRateLimit = createLimiter(100, '1 m', 'ratelimit:api')
