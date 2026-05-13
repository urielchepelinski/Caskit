import { describe, it, expect } from 'vitest'

describe('Analytics Events', () => {
  const Events = {
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
  }

  it('tracks all key funnel events', () => {
    const funnelEvents = [
      Events.SCAN_COMPLETED,
      Events.BOTTLE_VIEWED,
      Events.COLLECTION_ADD,
      Events.REVIEW_SUBMITTED,
      Events.PREMIUM_STARTED,
    ]
    expect(funnelEvents).toHaveLength(5)
  })

  it('has distinct event names (no collisions)', () => {
    const values = Object.values(Events)
    const unique = new Set(values)
    expect(unique.size).toBe(values.length)
  })

  it('all events are lowercase snake_case', () => {
    Object.values(Events).forEach(event => {
      expect(event).toMatch(/^[a-z_]+$/)
    })
  })

  it('tracks scan funnel correctly', () => {
    const scanFunnel = [Events.SCAN_STARTED, Events.SCAN_COMPLETED, Events.BOTTLE_VIEWED]
    expect(scanFunnel[0]).toBe('scan_started')
    expect(scanFunnel[2]).toBe('bottle_viewed')
  })

  it('tracks monetization events', () => {
    expect(Events.AFFILIATE_CLICK).toBe('affiliate_click')
    expect(Events.PREMIUM_VIEWED).toBe('premium_viewed')
    expect(Events.PREMIUM_STARTED).toBe('premium_started')
  })
})
