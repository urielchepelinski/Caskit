import posthog from 'posthog-js'

let initialized = false

export function initAnalytics() {
  if (typeof window === 'undefined' || initialized) return

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

  if (!key || !host) return

  posthog.init(key, {
    api_host: host,
    capture_pageview: true,
    capture_pageleave: true,
  })

  initialized = true
}

export function trackEvent(event: string, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  posthog.capture(event, properties)
}

export function identifyUser(userId: string, traits?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  posthog.identify(userId, traits)
}

export const Events = {
  SCAN_STARTED: 'scan_started',
  SCAN_COMPLETED: 'scan_completed',
  SCAN_FAILED: 'scan_failed',
  BOTTLE_VIEWED: 'bottle_viewed',
  COLLECTION_ADD: 'collection_add',
  COLLECTION_REMOVE: 'collection_remove',
  REVIEW_SUBMITTED: 'review_submitted',
  AFFILIATE_CLICK: 'affiliate_click',
  PREMIUM_VIEWED: 'premium_viewed',
  PREMIUM_STARTED: 'premium_started',
  SEARCH_PERFORMED: 'search_performed',
} as const
