import { pgTable, text, integer, boolean, timestamp, jsonb, real, varchar, serial, index, uniqueIndex } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const distilleries = pgTable('distilleries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  country: text('country').notNull(),
  region: text('region'),
  lat: real('lat'),
  lng: real('lng'),
  website: text('website'),
  description: text('description'),
  imageUrl: text('image_url'),
  logoUrl: text('logo_url'),
  verified: boolean('verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: uniqueIndex('distilleries_slug_idx').on(table.slug),
  countryIdx: index('distilleries_country_idx').on(table.country),
}))

export const bottles = pgTable('bottles', {
  id: serial('id').primaryKey(),
  distilleryId: integer('distillery_id').references(() => distilleries.id).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  type: text('type').notNull(), // scotch, bourbon, rye, irish, japanese, world
  category: text('category').notNull(), // single_malt, blended, grain, other
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: uniqueIndex('bottles_slug_idx').on(table.slug),
  distilleryIdx: index('bottles_distillery_idx').on(table.distilleryId),
  typeIdx: index('bottles_type_idx').on(table.type),
}))

export const expressions = pgTable('expressions', {
  id: serial('id').primaryKey(),
  bottleId: integer('bottle_id').references(() => bottles.id).notNull(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  ageYears: integer('age_years'),
  abv: real('abv'),
  vintageYear: integer('vintage_year'),
  isLimitedEdition: boolean('is_limited_edition').default(false),
  releaseYear: integer('release_year'),
  caskType: text('cask_type'),
  caskSize: text('cask_size'),
  woodFinish: text('wood_finish'),
  agingMethod: text('aging_method'),
  distillationType: text('distillation_type'),
  mashBill: text('mash_bill'),
  waterSource: text('water_source'),
  chillFiltered: boolean('chill_filtered'),
  naturalColor: boolean('natural_color'),
  batchNumber: text('batch_number'),
  bottleCount: integer('bottle_count'),
  distillerNotes: text('distiller_notes'),
  flavorProfile: jsonb('flavor_profile').$type<Record<string, number>>(),
  story: text('story'),
  description: text('description'),
  imageUrl: text('image_url'),
  thumbnailUrl: text('thumbnail_url'),
  avgCommunityScore: real('avg_community_score'),
  reviewCount: integer('review_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  slugIdx: uniqueIndex('expressions_slug_idx').on(table.slug),
  bottleIdx: index('expressions_bottle_idx').on(table.bottleId),
}))

export const perceptualHashes = pgTable('perceptual_hashes', {
  id: serial('id').primaryKey(),
  hashValue: varchar('hash_value', { length: 64 }).notNull(),
  expressionId: integer('expression_id').references(() => expressions.id).notNull(),
  confidence: real('confidence').default(1.0),
  sampleImageUrl: text('sample_image_url'),
  hitCount: integer('hit_count').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  hashIdx: index('phash_hash_idx').on(table.hashValue),
  expressionIdx: index('phash_expression_idx').on(table.expressionId),
}))

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  passwordHash: text('password_hash'),
  avatarUrl: text('avatar_url'),
  subscriptionTier: text('subscription_tier').default('free').notNull(), // free, premium
  stripeCustomerId: text('stripe_customer_id'),
  country: varchar('country', { length: 2 }), // ISO 3166-1 alpha-2 (US, GB, IL, etc.)
  city: text('city'),
  lat: real('lat'),
  lng: real('lng'),
  preferences: jsonb('preferences').$type<{
    preferredStyle?: string
    smokiness?: number
    sweetness?: number
    occasion?: string
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: uniqueIndex('users_email_idx').on(table.email),
  countryIdx: index('users_country_idx').on(table.country),
}))

export const collections = pgTable('collections', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  expressionId: integer('expression_id').references(() => expressions.id).notNull(),
  status: text('status').notNull(), // owned, wishlist, tasted
  purchasePrice: real('purchase_price'),
  purchaseDate: timestamp('purchase_date'),
  purchaseLocation: text('purchase_location'),
  personalNotes: text('personal_notes'),
  addedAt: timestamp('added_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('collections_user_idx').on(table.userId),
  userExpressionIdx: uniqueIndex('collections_user_expression_idx').on(table.userId, table.expressionId),
}))

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id).notNull(),
  expressionId: integer('expression_id').references(() => expressions.id).notNull(),
  score: integer('score').notNull(), // 1-100
  nose: text('nose'),
  palate: text('palate'),
  finish: text('finish'),
  liked: boolean('liked'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  userExpressionIdx: uniqueIndex('reviews_user_expression_idx').on(table.userId, table.expressionId),
  expressionIdx: index('reviews_expression_idx').on(table.expressionId),
}))

export const awardScores = pgTable('award_scores', {
  id: serial('id').primaryKey(),
  expressionId: integer('expression_id').references(() => expressions.id).notNull(),
  competitionName: text('competition_name').notNull(),
  year: integer('year').notNull(),
  awardLevel: text('award_level').notNull(), // gold, silver, bronze, double_gold
  score: integer('score'),
  sourceUrl: text('source_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  expressionIdx: index('awards_expression_idx').on(table.expressionId),
}))

export const prices = pgTable('prices', {
  id: serial('id').primaryKey(),
  expressionId: integer('expression_id').references(() => expressions.id).notNull(),
  countryCode: varchar('country_code', { length: 2 }).notNull(), // ISO 3166-1 alpha-2
  currency: varchar('currency', { length: 3 }).notNull(), // ISO 4217 (USD, GBP, EUR, etc.)
  minPrice: real('min_price'),
  maxPrice: real('max_price'),
  avgPrice: real('avg_price'),
  retailer: text('retailer'), // e.g. 'Wine-Searcher', 'Master of Malt', 'aggregate'
  retailerUrl: text('retailer_url'),
  lastUpdated: timestamp('last_updated').defaultNow().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  expressionIdx: index('prices_expression_idx').on(table.expressionId),
  countryIdx: index('prices_country_idx').on(table.countryCode),
  expressionCountryIdx: uniqueIndex('prices_expression_country_retailer_idx').on(table.expressionId, table.countryCode, table.retailer),
}))

export const scans = pgTable('scans', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  expressionId: integer('expression_id').references(() => expressions.id),
  imageUrl: text('image_url'),
  thumbnailUrl: text('thumbnail_url'),
  recognitionMethod: text('recognition_method').notNull(), // cache, classifier, ocr, vision_api, manual
  confidence: real('confidence'),
  rawResult: jsonb('raw_result'),
  perceptualHashId: integer('perceptual_hash_id').references(() => perceptualHashes.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdx: index('scans_user_idx').on(table.userId),
  expressionIdx: index('scans_expression_idx').on(table.expressionId),
}))

// Relations
export const distilleriesRelations = relations(distilleries, ({ many }) => ({
  bottles: many(bottles),
}))

export const bottlesRelations = relations(bottles, ({ one, many }) => ({
  distillery: one(distilleries, { fields: [bottles.distilleryId], references: [distilleries.id] }),
  expressions: many(expressions),
}))

export const expressionsRelations = relations(expressions, ({ one, many }) => ({
  bottle: one(bottles, { fields: [expressions.bottleId], references: [bottles.id] }),
  reviews: many(reviews),
  awards: many(awardScores),
  prices: many(prices),
  hashes: many(perceptualHashes),
}))

export const pricesRelations = relations(prices, ({ one }) => ({
  expression: one(expressions, { fields: [prices.expressionId], references: [expressions.id] }),
}))

export const usersRelations = relations(users, ({ many }) => ({
  collections: many(collections),
  reviews: many(reviews),
  scans: many(scans),
}))

export const collectionsRelations = relations(collections, ({ one }) => ({
  user: one(users, { fields: [collections.userId], references: [users.id] }),
  expression: one(expressions, { fields: [collections.expressionId], references: [expressions.id] }),
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, { fields: [reviews.userId], references: [users.id] }),
  expression: one(expressions, { fields: [reviews.expressionId], references: [expressions.id] }),
}))

export const awardScoresRelations = relations(awardScores, ({ one }) => ({
  expression: one(expressions, { fields: [awardScores.expressionId], references: [expressions.id] }),
}))

export const scansRelations = relations(scans, ({ one }) => ({
  user: one(users, { fields: [scans.userId], references: [users.id] }),
  expression: one(expressions, { fields: [scans.expressionId], references: [expressions.id] }),
  perceptualHash: one(perceptualHashes, { fields: [scans.perceptualHashId], references: [perceptualHashes.id] }),
}))
