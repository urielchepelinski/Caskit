// @ts-nocheck
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { distilleries, bottles, expressions, awardScores } from '../src/db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function seed() {
  console.log('Seeding Caskit database...')

  // Israeli Distilleries
  const [mh] = await db.insert(distilleries).values([
    {
      name: 'Milk & Honey',
      slug: 'milk-and-honey',
      country: 'Israel',
      region: 'Tel Aviv',
      lat: 32.0546,
      lng: 34.7554,
      website: 'https://mh-distillery.com',
      description: "Israel's first whisky distillery, founded in 2014 in the heart of Tel Aviv. Known for innovative cask programs leveraging the warm Mediterranean climate for accelerated maturation.",
      imageUrl: 'https://mh-distillery.com/wp-content/uploads/2023/01/Series-banner_1920x723-apex-terroir.jpg',
      logoUrl: 'https://mh-distillery.com/wp-content/uploads/2022/07/logo-vector.svg',
      verified: true,
    },
    {
      name: 'Golan Heights Distillery',
      slug: 'golan-heights',
      country: 'Israel',
      region: 'Katzrin',
      lat: 32.9914,
      lng: 35.6924,
      website: 'https://www.golanispirit.com',
      description: 'Situated in the volcanic Golan Heights at 400m elevation, producing whisky influenced by the unique terroir and climate of the region.',
      imageUrl: 'https://www.golanispirit.com/cdn/shop/files/about-us.jpg?v=1684073125',
      verified: true,
    },
    {
      name: 'Pelter',
      slug: 'pelter',
      country: 'Israel',
      region: 'Upper Galilee',
      lat: 33.0079,
      lng: 35.5247,
      website: 'https://pelter.co.il',
      description: 'A family winery in Upper Galilee that expanded into whisky production, combining winemaking expertise with distilling craft.',
      verified: true,
    },
  ]).returning()

  const [golanHeights] = await db.select().from(distilleries).where(
    ({ slug }) => slug === 'golan-heights'
  )
  const [pelter] = await db.select().from(distilleries).where(
    ({ slug }) => slug === 'pelter'
  )

  // Scottish Distilleries
  const lagavulinResult = await db.insert(distilleries).values([
    {
      name: 'Lagavulin',
      slug: 'lagavulin',
      country: 'Scotland',
      region: 'Islay',
      lat: 55.6358,
      lng: -6.1264,
      website: 'https://www.lagavulin.com',
      description: 'One of the most iconic Islay distilleries, known for its intense, smoky, peaty single malts. Established in 1816.',
      verified: true,
    },
    {
      name: 'Macallan',
      slug: 'macallan',
      country: 'Scotland',
      region: 'Speyside',
      lat: 57.4848,
      lng: -3.2081,
      website: 'https://www.themacallan.com',
      description: 'The Macallan is renowned for its rich, sherried single malts. One of the most collected and investment-worthy whisky brands in the world.',
      verified: true,
    },
    {
      name: 'Talisker',
      slug: 'talisker',
      country: 'Scotland',
      region: 'Isle of Skye',
      lat: 57.3025,
      lng: -6.3564,
      website: 'https://www.talisker.com',
      description: 'The only distillery on the Isle of Skye, producing distinctively maritime and peppery single malts since 1830.',
      verified: true,
    },
  ]).returning()

  const lagavulin = lagavulinResult[0]
  const macallan = lagavulinResult[1]
  const talisker = lagavulinResult[2]

  // Japanese Distilleries
  await db.insert(distilleries).values([
    {
      name: 'Yamazaki',
      slug: 'yamazaki',
      country: 'Japan',
      region: 'Osaka',
      lat: 34.8931,
      lng: 135.6718,
      website: 'https://www.suntory.com/factory/yamazaki',
      description: "Japan's first and oldest malt whisky distillery, founded by Shinjiro Torii in 1923. Located at the confluence of three rivers.",
      verified: true,
    },
    {
      name: 'Nikka',
      slug: 'nikka',
      country: 'Japan',
      region: 'Hokkaido',
      lat: 43.0781,
      lng: 140.9744,
      website: 'https://www.nikka.com',
      description: 'Founded by Masataka Taketsuru in 1934, producing award-winning Japanese whiskies from two distinct distilleries.',
      verified: true,
    },
  ])

  // American Distilleries
  await db.insert(distilleries).values([
    {
      name: "Maker's Mark",
      slug: 'makers-mark',
      country: 'United States',
      region: 'Kentucky',
      lat: 37.6800,
      lng: -85.3400,
      website: 'https://www.makersmark.com',
      description: 'A Kentucky straight bourbon whisky distillery known for using red winter wheat instead of rye in its mash bill.',
      verified: true,
    },
    {
      name: 'Buffalo Trace',
      slug: 'buffalo-trace',
      country: 'United States',
      region: 'Kentucky',
      lat: 38.2106,
      lng: -84.8675,
      website: 'https://www.buffalotracedistillery.com',
      description: 'One of the oldest continuously operating distilleries in America, home to legendary bourbons including Pappy Van Winkle.',
      verified: true,
    },
  ])

  console.log('Distilleries seeded.')

  // Bottles & Expressions - M&H
  const [mhApex] = await db.insert(bottles).values([
    { distilleryId: mh.id, name: 'Apex Dead Sea', slug: 'mh-apex-dead-sea', type: 'world', category: 'single_malt' },
    { distilleryId: mh.id, name: 'Apex Jerusalem', slug: 'mh-apex-jerusalem', type: 'world', category: 'single_malt' },
    { distilleryId: mh.id, name: 'Classic Single Malt', slug: 'mh-classic', type: 'world', category: 'single_malt' },
    { distilleryId: mh.id, name: 'Elements Sherry', slug: 'mh-elements-sherry', type: 'world', category: 'single_malt' },
  ]).returning()

  await db.insert(expressions).values([
    {
      bottleId: mhApex.id,
      name: 'Apex Dead Sea Terroir',
      slug: 'mh-apex-dead-sea-terroir',
      abv: 57.4,
      caskType: 'STR Casks (Shaved, Toasted, Re-charred)',
      agingMethod: 'Dead Sea climate maturation',
      naturalColor: true,
      chillFiltered: false,
      flavorProfile: { smoky: 3, peaty: 1, fruity: 6, floral: 4, spicy: 7, sweet: 6, oaky: 5, maritime: 2, vanilla: 7, chocolate: 4 },
      story: "Sweet French vanilla and mocha, a rush of warm cinnamon and coriander, long finish with candied ginger and sea salt. Matured at the lowest point on Earth where extreme heat accelerates the angel's share, concentrating flavors into something truly unique.",
      description: 'Terroir Series single malt aged near the Dead Sea',
      imageUrl: 'https://mh-distillery.com/wp-content/uploads/2025/05/apex-dead-sea-terroir-874X918-1.png',
      avgCommunityScore: 92,
      reviewCount: 1842,
    },
    {
      bottleId: mhApex.id,
      name: 'Apex Jerusalem Terroir',
      slug: 'mh-apex-jerusalem-terroir',
      abv: 55.4,
      caskType: 'Ex-Red Wine Casks',
      agingMethod: 'Jerusalem Hills climate maturation',
      naturalColor: true,
      chillFiltered: false,
      flavorProfile: { smoky: 2, peaty: 1, fruity: 8, floral: 6, spicy: 4, sweet: 5, oaky: 4, maritime: 1, vanilla: 5, chocolate: 3 },
      story: "Bright green apples with citrus leaf and subtle oak, fresh pine, toffee apple finish. The cool Jerusalem night air slows maturation, allowing delicate fruit notes to develop over years of patient rest in the Judean Hills.",
      description: 'Terroir Series single malt aged in the Jerusalem Hills',
      imageUrl: 'https://mh-distillery.com/wp-content/uploads/2025/05/apex-jerusalem-terroir-874X918-1.png',
      avgCommunityScore: 88,
      reviewCount: 956,
    },
  ])

  // Pelter expressions
  const [pelterSM] = await db.insert(bottles).values([
    { distilleryId: pelter.id, name: 'Single Malt 10 Year', slug: 'pelter-single-malt-10', type: 'world', category: 'single_malt' },
    { distilleryId: pelter.id, name: 'Rye', slug: 'pelter-rye', type: 'world', category: 'other' },
  ]).returning()

  await db.insert(expressions).values([
    {
      bottleId: pelterSM.id,
      name: 'Single Malt 10 Year Old',
      slug: 'pelter-single-malt-10y',
      ageYears: 10,
      abv: 46,
      caskType: 'Ex-Bourbon Casks',
      agingMethod: 'Golan Heights elevation maturation',
      naturalColor: true,
      chillFiltered: false,
      flavorProfile: { smoky: 2, peaty: 1, fruity: 5, floral: 3, spicy: 4, sweet: 7, oaky: 6, maritime: 1, vanilla: 8, chocolate: 3 },
      story: "A decade of Golan Heights maturation, pecan pie, lemon drizzle cake, warm oak and honey. The volcanic basalt soil and high altitude create dramatic temperature swings that push whisky in and out of the wood, building complexity year after year.",
      description: '10 year single malt from the Golan Heights',
      imageUrl: 'https://media.getmood.io/warehouse/dynamic/731109.jpg',
      avgCommunityScore: 86,
      reviewCount: 412,
    },
  ])

  // Lagavulin expressions
  const [lag16Bottle] = await db.insert(bottles).values([
    { distilleryId: lagavulin.id, name: '16 Year Old', slug: 'lagavulin-16', type: 'scotch', category: 'single_malt' },
    { distilleryId: lagavulin.id, name: '8 Year Old', slug: 'lagavulin-8', type: 'scotch', category: 'single_malt' },
    { distilleryId: lagavulin.id, name: 'Distillers Edition', slug: 'lagavulin-de', type: 'scotch', category: 'single_malt' },
  ]).returning()

  await db.insert(expressions).values([
    {
      bottleId: lag16Bottle.id,
      name: '16 Year Old',
      slug: 'lagavulin-16-standard',
      ageYears: 16,
      abv: 43,
      caskType: 'Ex-Sherry Oloroso',
      chillFiltered: false,
      naturalColor: true,
      flavorProfile: { smoky: 8, peaty: 8, fruity: 3, floral: 2, spicy: 5, sweet: 4, oaky: 6, maritime: 7, vanilla: 3, chocolate: 2 },
      story: "Aged sixteen years in American oak, then rested in hand-selected oloroso sherry casks from Jerez. Bottled at natural strength without chill filtration, letting the rich mahogany color and full body speak for themselves. This is Lagavulin at its most uncompromising.",
      description: 'The definitive Islay single malt',
      avgCommunityScore: 91,
      reviewCount: 4250,
    },
  ])

  // Awards
  await db.insert(awardScores).values([
    { expressionId: 1, competitionName: 'SFWSC', year: 2024, awardLevel: 'double_gold', score: 96 },
    { expressionId: 1, competitionName: 'IWSC', year: 2023, awardLevel: 'gold', score: 95 },
    { expressionId: 4, competitionName: 'World Whiskies Awards', year: 2024, awardLevel: 'gold' },
    { expressionId: 4, competitionName: 'IWSC', year: 2024, awardLevel: 'gold', score: 93 },
  ])

  console.log('Seed complete! Database populated with:')
  console.log('- 10 distilleries (Israel, Scotland, Japan, USA)')
  console.log('- 9 bottles')
  console.log('- 4 expressions with full flavor profiles')
  console.log('- 4 award scores')
}

seed().catch(console.error)
