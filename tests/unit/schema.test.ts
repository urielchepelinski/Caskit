import { describe, it, expect } from 'vitest'
import * as schema from '@/db/schema'

describe('Database Schema', () => {
  it('exports all required tables', () => {
    expect(schema.distilleries).toBeDefined()
    expect(schema.bottles).toBeDefined()
    expect(schema.expressions).toBeDefined()
    expect(schema.perceptualHashes).toBeDefined()
    expect(schema.users).toBeDefined()
    expect(schema.collections).toBeDefined()
    expect(schema.reviews).toBeDefined()
    expect(schema.awardScores).toBeDefined()
    expect(schema.scans).toBeDefined()
  })

  it('exports all relation definitions', () => {
    expect(schema.distilleriesRelations).toBeDefined()
    expect(schema.bottlesRelations).toBeDefined()
    expect(schema.expressionsRelations).toBeDefined()
    expect(schema.usersRelations).toBeDefined()
    expect(schema.collectionsRelations).toBeDefined()
    expect(schema.reviewsRelations).toBeDefined()
    expect(schema.awardScoresRelations).toBeDefined()
    expect(schema.scansRelations).toBeDefined()
  })

  it('distilleries table has correct columns', () => {
    const columns = Object.keys(schema.distilleries)
    expect(columns).toContain('id')
    expect(columns).toContain('name')
    expect(columns).toContain('slug')
    expect(columns).toContain('country')
    expect(columns).toContain('region')
    expect(columns).toContain('lat')
    expect(columns).toContain('lng')
  })

  it('expressions table has flavor profile JSONB', () => {
    const columns = Object.keys(schema.expressions)
    expect(columns).toContain('flavorProfile')
    expect(columns).toContain('story')
    expect(columns).toContain('avgCommunityScore')
    expect(columns).toContain('reviewCount')
  })

  it('perceptual_hashes table has hash lookup fields', () => {
    const columns = Object.keys(schema.perceptualHashes)
    expect(columns).toContain('hashValue')
    expect(columns).toContain('expressionId')
    expect(columns).toContain('confidence')
    expect(columns).toContain('hitCount')
  })
})
