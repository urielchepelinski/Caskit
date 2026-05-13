/**
 * Pre-seed script for Caskit whiskey database
 * Generates 10,000+ expression records using real distillery data
 * Run: tsx scripts/pre-seed.ts
 */

import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { distilleries, bottles, expressions, perceptualHashes } from '../src/db/schema'

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

// Seeded PRNG for deterministic output (mulberry32)
function createRng(seed: number) {
  let s = seed | 0
  return function (): number {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rng = createRng(424253)

function randomInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min
}

function randomFloat(min: number, max: number, decimals: number = 1): number {
  return parseFloat((rng() * (max - min) + min).toFixed(decimals))
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)]
}

function pickMultiple<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => rng() - 0.5)
  return shuffled.slice(0, count)
}

function generateHexHash(): string {
  let hash = ''
  for (let i = 0; i < 64; i++) {
    hash += Math.floor(rng() * 16).toString(16)
  }
  return hash
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// ─── Distillery Data ───────────────────────────────────────────────────────────

interface DistilleryTemplate {
  name: string
  country: string
  region: string
  lat: number
  lng: number
  type: string
  category: string
  expressionCount: number
  flavorBase: Record<string, number>
}

const SCOTTISH_ISLAY: DistilleryTemplate[] = [
  { name: 'Lagavulin', country: 'Scotland', region: 'Islay', lat: 55.636, lng: -6.126, type: 'scotch', category: 'single_malt', expressionCount: 35, flavorBase: { smoky: 8, peaty: 9, fruity: 3, floral: 2, spicy: 5, sweet: 3, oaky: 5, maritime: 8, vanilla: 3, chocolate: 2 } },
  { name: 'Ardbeg', country: 'Scotland', region: 'Islay', lat: 55.640, lng: -6.108, type: 'scotch', category: 'single_malt', expressionCount: 40, flavorBase: { smoky: 9, peaty: 9, fruity: 4, floral: 1, spicy: 6, sweet: 3, oaky: 4, maritime: 7, vanilla: 2, chocolate: 3 } },
  { name: 'Laphroaig', country: 'Scotland', region: 'Islay', lat: 55.631, lng: -6.152, type: 'scotch', category: 'single_malt', expressionCount: 35, flavorBase: { smoky: 9, peaty: 8, fruity: 2, floral: 1, spicy: 5, sweet: 4, oaky: 5, maritime: 8, vanilla: 4, chocolate: 1 } },
  { name: 'Bowmore', country: 'Scotland', region: 'Islay', lat: 55.757, lng: -6.290, type: 'scotch', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 6, peaty: 6, fruity: 5, floral: 3, spicy: 4, sweet: 5, oaky: 5, maritime: 7, vanilla: 5, chocolate: 3 } },
  { name: 'Caol Ila', country: 'Scotland', region: 'Islay', lat: 55.854, lng: -6.106, type: 'scotch', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 7, peaty: 7, fruity: 4, floral: 2, spicy: 4, sweet: 4, oaky: 4, maritime: 8, vanilla: 3, chocolate: 2 } },
  { name: 'Bruichladdich', country: 'Scotland', region: 'Islay', lat: 55.763, lng: -6.362, type: 'scotch', category: 'single_malt', expressionCount: 45, flavorBase: { smoky: 4, peaty: 3, fruity: 7, floral: 5, spicy: 4, sweet: 6, oaky: 4, maritime: 6, vanilla: 5, chocolate: 2 } },
  { name: 'Kilchoman', country: 'Scotland', region: 'Islay', lat: 55.790, lng: -6.440, type: 'scotch', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 7, peaty: 7, fruity: 5, floral: 3, spicy: 5, sweet: 4, oaky: 4, maritime: 6, vanilla: 4, chocolate: 2 } },
  { name: 'Bunnahabhain', country: 'Scotland', region: 'Islay', lat: 55.883, lng: -6.125, type: 'scotch', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 3, peaty: 2, fruity: 6, floral: 4, spicy: 4, sweet: 6, oaky: 5, maritime: 6, vanilla: 6, chocolate: 4 } },
]

const SCOTTISH_HIGHLAND: DistilleryTemplate[] = [
  { name: 'Glenmorangie', country: 'Scotland', region: 'Highland', lat: 57.775, lng: -4.010, type: 'scotch', category: 'single_malt', expressionCount: 35, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 6, spicy: 4, sweet: 7, oaky: 5, maritime: 2, vanilla: 8, chocolate: 3 } },
  { name: 'Dalmore', country: 'Scotland', region: 'Highland', lat: 57.689, lng: -4.245, type: 'scotch', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 3, spicy: 5, sweet: 6, oaky: 7, maritime: 2, vanilla: 5, chocolate: 6 } },
  { name: 'Oban', country: 'Scotland', region: 'Highland', lat: 56.414, lng: -5.472, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 4, peaty: 3, fruity: 5, floral: 3, spicy: 5, sweet: 5, oaky: 5, maritime: 6, vanilla: 4, chocolate: 3 } },
  { name: 'Clynelish', country: 'Scotland', region: 'Highland', lat: 58.014, lng: -3.870, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 3, peaty: 2, fruity: 5, floral: 4, spicy: 4, sweet: 5, oaky: 5, maritime: 5, vanilla: 5, chocolate: 2 } },
  { name: 'Ben Nevis', country: 'Scotland', region: 'Highland', lat: 56.817, lng: -5.095, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 3, peaty: 2, fruity: 5, floral: 3, spicy: 5, sweet: 5, oaky: 6, maritime: 3, vanilla: 5, chocolate: 4 } },
  { name: 'Talisker', country: 'Scotland', region: 'Isle of Skye', lat: 57.303, lng: -6.356, type: 'scotch', category: 'single_malt', expressionCount: 28, flavorBase: { smoky: 6, peaty: 5, fruity: 3, floral: 2, spicy: 7, sweet: 3, oaky: 5, maritime: 9, vanilla: 3, chocolate: 2 } },
  { name: 'Highland Park', country: 'Scotland', region: 'Orkney', lat: 58.968, lng: -2.955, type: 'scotch', category: 'single_malt', expressionCount: 32, flavorBase: { smoky: 5, peaty: 4, fruity: 5, floral: 4, spicy: 5, sweet: 6, oaky: 5, maritime: 5, vanilla: 5, chocolate: 3 } },
  { name: 'Tomatin', country: 'Scotland', region: 'Highland', lat: 57.339, lng: -4.016, type: 'scotch', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 1, vanilla: 7, chocolate: 3 } },
  { name: 'Edradour', country: 'Scotland', region: 'Highland', lat: 56.705, lng: -3.710, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 4, spicy: 5, sweet: 6, oaky: 5, maritime: 1, vanilla: 6, chocolate: 4 } },
  { name: 'Aberfeldy', country: 'Scotland', region: 'Highland', lat: 56.621, lng: -3.871, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 1, peaty: 0, fruity: 5, floral: 4, spicy: 3, sweet: 7, oaky: 5, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Pulteney', country: 'Scotland', region: 'Highland', lat: 58.438, lng: -3.086, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 5, floral: 3, spicy: 5, sweet: 5, oaky: 5, maritime: 7, vanilla: 4, chocolate: 2 } },
  { name: 'Royal Brackla', country: 'Scotland', region: 'Highland', lat: 57.594, lng: -3.916, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 5, spicy: 3, sweet: 6, oaky: 5, maritime: 1, vanilla: 6, chocolate: 3 } },
]

const SCOTTISH_SPEYSIDE: DistilleryTemplate[] = [
  { name: 'Macallan', country: 'Scotland', region: 'Speyside', lat: 57.485, lng: -3.208, type: 'scotch', category: 'single_malt', expressionCount: 50, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 4, spicy: 5, sweet: 7, oaky: 7, maritime: 1, vanilla: 6, chocolate: 5 } },
  { name: 'Glenfiddich', country: 'Scotland', region: 'Speyside', lat: 57.454, lng: -3.128, type: 'scotch', category: 'single_malt', expressionCount: 45, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 1, vanilla: 7, chocolate: 2 } },
  { name: 'Glenlivet', country: 'Scotland', region: 'Speyside', lat: 57.348, lng: -3.339, type: 'scotch', category: 'single_malt', expressionCount: 40, flavorBase: { smoky: 0, peaty: 0, fruity: 8, floral: 6, spicy: 3, sweet: 6, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Aberlour', country: 'Scotland', region: 'Speyside', lat: 57.468, lng: -3.226, type: 'scotch', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 4, spicy: 5, sweet: 7, oaky: 6, maritime: 0, vanilla: 5, chocolate: 5 } },
  { name: 'Balvenie', country: 'Scotland', region: 'Speyside', lat: 57.453, lng: -3.130, type: 'scotch', category: 'single_malt', expressionCount: 35, flavorBase: { smoky: 1, peaty: 0, fruity: 5, floral: 4, spicy: 4, sweet: 7, oaky: 6, maritime: 0, vanilla: 8, chocolate: 3 } },
  { name: 'Glenfarclas', country: 'Scotland', region: 'Speyside', lat: 57.411, lng: -3.313, type: 'scotch', category: 'single_malt', expressionCount: 35, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 3, spicy: 5, sweet: 6, oaky: 6, maritime: 0, vanilla: 5, chocolate: 5 } },
  { name: 'Craigellachie', country: 'Scotland', region: 'Speyside', lat: 57.481, lng: -3.178, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 3, peaty: 1, fruity: 5, floral: 3, spicy: 6, sweet: 5, oaky: 5, maritime: 1, vanilla: 4, chocolate: 3 } },
  { name: 'Mortlach', country: 'Scotland', region: 'Speyside', lat: 57.448, lng: -3.136, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 2, peaty: 1, fruity: 5, floral: 2, spicy: 6, sweet: 5, oaky: 6, maritime: 1, vanilla: 4, chocolate: 5 } },
  { name: 'BenRiach', country: 'Scotland', region: 'Speyside', lat: 57.618, lng: -3.347, type: 'scotch', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 3, peaty: 2, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'GlenDronach', country: 'Scotland', region: 'Speyside', lat: 57.397, lng: -2.826, type: 'scotch', category: 'single_malt', expressionCount: 28, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 3, spicy: 5, sweet: 7, oaky: 7, maritime: 0, vanilla: 5, chocolate: 6 } },
  { name: 'Cardhu', country: 'Scotland', region: 'Speyside', lat: 57.413, lng: -3.317, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 5, spicy: 3, sweet: 7, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Cragganmore', country: 'Scotland', region: 'Speyside', lat: 57.371, lng: -3.381, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 5, sweet: 5, oaky: 5, maritime: 1, vanilla: 5, chocolate: 3 } },
  { name: 'Strathisla', country: 'Scotland', region: 'Speyside', lat: 57.531, lng: -2.723, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 0, vanilla: 6, chocolate: 3 } },
  { name: 'Knockando', country: 'Scotland', region: 'Speyside', lat: 57.442, lng: -3.348, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Glen Grant', country: 'Scotland', region: 'Speyside', lat: 57.530, lng: -3.330, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 0, peaty: 0, fruity: 7, floral: 6, spicy: 3, sweet: 7, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Tamdhu', country: 'Scotland', region: 'Speyside', lat: 57.434, lng: -3.309, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 4, spicy: 4, sweet: 7, oaky: 6, maritime: 0, vanilla: 6, chocolate: 4 } },
  { name: 'Benromach', country: 'Scotland', region: 'Speyside', lat: 57.612, lng: -3.627, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 3, peaty: 2, fruity: 5, floral: 4, spicy: 5, sweet: 6, oaky: 5, maritime: 1, vanilla: 5, chocolate: 3 } },
  { name: 'Dailuaine', country: 'Scotland', region: 'Speyside', lat: 57.422, lng: -3.264, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 5, floral: 3, spicy: 5, sweet: 6, oaky: 6, maritime: 0, vanilla: 5, chocolate: 4 } },
  { name: 'Linkwood', country: 'Scotland', region: 'Speyside', lat: 57.612, lng: -3.275, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 6, spicy: 3, sweet: 6, oaky: 4, maritime: 0, vanilla: 6, chocolate: 2 } },
  { name: 'Glen Elgin', country: 'Scotland', region: 'Speyside', lat: 57.617, lng: -3.309, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Inchgower', country: 'Scotland', region: 'Speyside', lat: 57.672, lng: -2.843, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 5, floral: 4, spicy: 4, sweet: 5, oaky: 5, maritime: 3, vanilla: 5, chocolate: 3 } },
  { name: 'Longmorn', country: 'Scotland', region: 'Speyside', lat: 57.586, lng: -3.338, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 5, spicy: 4, sweet: 7, oaky: 5, maritime: 0, vanilla: 7, chocolate: 3 } },
  { name: 'Mannochmore', country: 'Scotland', region: 'Speyside', lat: 57.577, lng: -3.312, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
]

const SCOTTISH_LOWLAND: DistilleryTemplate[] = [
  { name: 'Auchentoshan', country: 'Scotland', region: 'Lowland', lat: 55.924, lng: -4.434, type: 'scotch', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 0, peaty: 0, fruity: 6, floral: 7, spicy: 3, sweet: 7, oaky: 4, maritime: 1, vanilla: 8, chocolate: 2 } },
  { name: 'Glenkinchie', country: 'Scotland', region: 'Lowland', lat: 55.869, lng: -2.889, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 7, spicy: 3, sweet: 7, oaky: 4, maritime: 1, vanilla: 7, chocolate: 2 } },
  { name: 'Bladnoch', country: 'Scotland', region: 'Lowland', lat: 54.856, lng: -4.547, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 0, peaty: 0, fruity: 7, floral: 6, spicy: 3, sweet: 6, oaky: 4, maritime: 2, vanilla: 7, chocolate: 2 } },
  { name: 'Daftmill', country: 'Scotland', region: 'Lowland', lat: 56.279, lng: -3.108, type: 'scotch', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 0, peaty: 0, fruity: 7, floral: 6, spicy: 2, sweet: 7, oaky: 4, maritime: 0, vanilla: 8, chocolate: 1 } },
]

const SCOTTISH_CAMPBELTOWN: DistilleryTemplate[] = [
  { name: 'Springbank', country: 'Scotland', region: 'Campbeltown', lat: 55.426, lng: -5.607, type: 'scotch', category: 'single_malt', expressionCount: 35, flavorBase: { smoky: 5, peaty: 4, fruity: 5, floral: 3, spicy: 6, sweet: 4, oaky: 5, maritime: 7, vanilla: 4, chocolate: 3 } },
  { name: 'Glen Scotia', country: 'Scotland', region: 'Campbeltown', lat: 55.425, lng: -5.609, type: 'scotch', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 4, peaty: 3, fruity: 5, floral: 3, spicy: 5, sweet: 5, oaky: 5, maritime: 7, vanilla: 4, chocolate: 3 } },
  { name: 'Kilkerran', country: 'Scotland', region: 'Campbeltown', lat: 55.427, lng: -5.606, type: 'scotch', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 5, peaty: 4, fruity: 5, floral: 3, spicy: 5, sweet: 4, oaky: 5, maritime: 6, vanilla: 4, chocolate: 3 } },
]

const AMERICAN: DistilleryTemplate[] = [
  { name: 'Buffalo Trace', country: 'United States', region: 'Kentucky', lat: 38.211, lng: -84.868, type: 'bourbon', category: 'single_malt', expressionCount: 40, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 2, spicy: 5, sweet: 8, oaky: 7, maritime: 0, vanilla: 9, chocolate: 4 } },
  { name: "Maker's Mark", country: 'United States', region: 'Kentucky', lat: 37.680, lng: -85.340, type: 'bourbon', category: 'other', expressionCount: 25, flavorBase: { smoky: 1, peaty: 0, fruity: 5, floral: 3, spicy: 4, sweet: 8, oaky: 6, maritime: 0, vanilla: 8, chocolate: 3 } },
  { name: 'Wild Turkey', country: 'United States', region: 'Kentucky', lat: 38.012, lng: -84.895, type: 'bourbon', category: 'other', expressionCount: 30, flavorBase: { smoky: 2, peaty: 0, fruity: 4, floral: 2, spicy: 7, sweet: 7, oaky: 8, maritime: 0, vanilla: 7, chocolate: 4 } },
  { name: 'Woodford Reserve', country: 'United States', region: 'Kentucky', lat: 38.067, lng: -84.840, type: 'bourbon', category: 'other', expressionCount: 30, flavorBase: { smoky: 2, peaty: 0, fruity: 6, floral: 3, spicy: 5, sweet: 7, oaky: 6, maritime: 0, vanilla: 8, chocolate: 5 } },
  { name: 'Four Roses', country: 'United States', region: 'Kentucky', lat: 37.934, lng: -85.094, type: 'bourbon', category: 'other', expressionCount: 25, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 5, spicy: 5, sweet: 7, oaky: 5, maritime: 0, vanilla: 7, chocolate: 3 } },
  { name: "Knob Creek", country: 'United States', region: 'Kentucky', lat: 37.812, lng: -85.630, type: 'bourbon', category: 'other', expressionCount: 22, flavorBase: { smoky: 2, peaty: 0, fruity: 4, floral: 2, spicy: 6, sweet: 7, oaky: 8, maritime: 0, vanilla: 7, chocolate: 4 } },
  { name: 'Elijah Craig', country: 'United States', region: 'Kentucky', lat: 37.756, lng: -85.467, type: 'bourbon', category: 'other', expressionCount: 25, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 2, spicy: 5, sweet: 7, oaky: 7, maritime: 0, vanilla: 8, chocolate: 5 } },
  { name: 'Pappy Van Winkle', country: 'United States', region: 'Kentucky', lat: 38.212, lng: -84.869, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 2, peaty: 0, fruity: 6, floral: 3, spicy: 4, sweet: 9, oaky: 8, maritime: 0, vanilla: 9, chocolate: 5 } },
  { name: 'Eagle Rare', country: 'United States', region: 'Kentucky', lat: 38.213, lng: -84.870, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 2, peaty: 0, fruity: 6, floral: 3, spicy: 5, sweet: 7, oaky: 7, maritime: 0, vanilla: 8, chocolate: 4 } },
  { name: 'Blanton\'s', country: 'United States', region: 'Kentucky', lat: 38.214, lng: -84.871, type: 'bourbon', category: 'other', expressionCount: 22, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 3, spicy: 5, sweet: 8, oaky: 6, maritime: 0, vanilla: 8, chocolate: 4 } },
  { name: 'Bulleit', country: 'United States', region: 'Kentucky', lat: 38.000, lng: -85.200, type: 'bourbon', category: 'other', expressionCount: 22, flavorBase: { smoky: 1, peaty: 0, fruity: 4, floral: 2, spicy: 7, sweet: 6, oaky: 6, maritime: 0, vanilla: 7, chocolate: 3 } },
  { name: 'Angel\'s Envy', country: 'United States', region: 'Kentucky', lat: 38.253, lng: -85.750, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 3, spicy: 4, sweet: 8, oaky: 6, maritime: 0, vanilla: 8, chocolate: 4 } },
  { name: 'WhistlePig', country: 'United States', region: 'Vermont', lat: 44.480, lng: -72.050, type: 'rye', category: 'other', expressionCount: 25, flavorBase: { smoky: 2, peaty: 0, fruity: 4, floral: 3, spicy: 9, sweet: 5, oaky: 7, maritime: 0, vanilla: 6, chocolate: 3 } },
  { name: 'Rittenhouse', country: 'United States', region: 'Kentucky', lat: 37.750, lng: -85.700, type: 'rye', category: 'other', expressionCount: 20, flavorBase: { smoky: 2, peaty: 0, fruity: 3, floral: 2, spicy: 8, sweet: 5, oaky: 6, maritime: 0, vanilla: 6, chocolate: 3 } },
  { name: 'Sazerac', country: 'United States', region: 'Kentucky', lat: 38.215, lng: -84.872, type: 'rye', category: 'other', expressionCount: 22, flavorBase: { smoky: 2, peaty: 0, fruity: 4, floral: 2, spicy: 8, sweet: 5, oaky: 6, maritime: 0, vanilla: 6, chocolate: 3 } },
  { name: 'Michter\'s', country: 'United States', region: 'Kentucky', lat: 38.260, lng: -85.760, type: 'bourbon', category: 'other', expressionCount: 25, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 3, spicy: 5, sweet: 7, oaky: 7, maritime: 0, vanilla: 8, chocolate: 5 } },
  { name: 'Heaven Hill', country: 'United States', region: 'Kentucky', lat: 37.813, lng: -85.631, type: 'bourbon', category: 'other', expressionCount: 30, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 2, spicy: 5, sweet: 7, oaky: 7, maritime: 0, vanilla: 7, chocolate: 4 } },
  { name: 'Russell\'s Reserve', country: 'United States', region: 'Kentucky', lat: 38.013, lng: -84.896, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 2, spicy: 6, sweet: 7, oaky: 7, maritime: 0, vanilla: 7, chocolate: 4 } },
  { name: 'Old Forester', country: 'United States', region: 'Kentucky', lat: 38.254, lng: -85.751, type: 'bourbon', category: 'other', expressionCount: 25, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 3, spicy: 5, sweet: 7, oaky: 6, maritime: 0, vanilla: 8, chocolate: 4 } },
  { name: 'Basil Hayden', country: 'United States', region: 'Kentucky', lat: 37.814, lng: -85.632, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 5, floral: 4, spicy: 6, sweet: 6, oaky: 5, maritime: 0, vanilla: 7, chocolate: 3 } },
  { name: 'George Dickel', country: 'United States', region: 'Tennessee', lat: 35.460, lng: -86.100, type: 'bourbon', category: 'other', expressionCount: 22, flavorBase: { smoky: 2, peaty: 0, fruity: 4, floral: 2, spicy: 5, sweet: 7, oaky: 6, maritime: 0, vanilla: 7, chocolate: 3 } },
  { name: 'Jack Daniel\'s', country: 'United States', region: 'Tennessee', lat: 35.282, lng: -86.371, type: 'bourbon', category: 'other', expressionCount: 30, flavorBase: { smoky: 3, peaty: 0, fruity: 4, floral: 2, spicy: 4, sweet: 7, oaky: 6, maritime: 0, vanilla: 7, chocolate: 4 } },
  { name: 'Booker\'s', country: 'United States', region: 'Kentucky', lat: 37.815, lng: -85.633, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 2, peaty: 0, fruity: 4, floral: 2, spicy: 7, sweet: 7, oaky: 8, maritime: 0, vanilla: 8, chocolate: 5 } },
  { name: 'Baker\'s', country: 'United States', region: 'Kentucky', lat: 37.816, lng: -85.634, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 3, spicy: 6, sweet: 7, oaky: 7, maritime: 0, vanilla: 7, chocolate: 4 } },
  { name: 'Garrison Brothers', country: 'United States', region: 'Texas', lat: 30.280, lng: -98.220, type: 'bourbon', category: 'other', expressionCount: 20, flavorBase: { smoky: 2, peaty: 0, fruity: 5, floral: 2, spicy: 5, sweet: 8, oaky: 7, maritime: 0, vanilla: 8, chocolate: 4 } },
  { name: 'Balcones', country: 'United States', region: 'Texas', lat: 31.549, lng: -97.147, type: 'bourbon', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 3, peaty: 0, fruity: 5, floral: 2, spicy: 6, sweet: 7, oaky: 7, maritime: 0, vanilla: 7, chocolate: 5 } },
  { name: 'Westland', country: 'United States', region: 'Washington', lat: 47.606, lng: -122.332, type: 'bourbon', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 3, peaty: 2, fruity: 6, floral: 4, spicy: 4, sweet: 6, oaky: 5, maritime: 2, vanilla: 6, chocolate: 4 } },
  { name: 'Stranahan\'s', country: 'United States', region: 'Colorado', lat: 39.739, lng: -104.990, type: 'bourbon', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 2, peaty: 0, fruity: 6, floral: 3, spicy: 4, sweet: 7, oaky: 5, maritime: 0, vanilla: 7, chocolate: 4 } },
  { name: 'New Riff', country: 'United States', region: 'Kentucky', lat: 39.070, lng: -84.468, type: 'bourbon', category: 'other', expressionCount: 22, flavorBase: { smoky: 1, peaty: 0, fruity: 5, floral: 3, spicy: 6, sweet: 7, oaky: 6, maritime: 0, vanilla: 7, chocolate: 3 } },
  { name: 'Barrell Craft Spirits', country: 'United States', region: 'Kentucky', lat: 38.255, lng: -85.752, type: 'bourbon', category: 'other', expressionCount: 25, flavorBase: { smoky: 2, peaty: 0, fruity: 6, floral: 3, spicy: 6, sweet: 7, oaky: 7, maritime: 0, vanilla: 7, chocolate: 4 } },
]

const JAPANESE: DistilleryTemplate[] = [
  { name: 'Yamazaki', country: 'Japan', region: 'Osaka', lat: 34.893, lng: 135.672, type: 'japanese', category: 'single_malt', expressionCount: 35, flavorBase: { smoky: 2, peaty: 1, fruity: 7, floral: 6, spicy: 4, sweet: 7, oaky: 5, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Hakushu', country: 'Japan', region: 'Yamanashi', lat: 35.841, lng: 138.318, type: 'japanese', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 3, peaty: 2, fruity: 7, floral: 7, spicy: 3, sweet: 5, oaky: 4, maritime: 1, vanilla: 5, chocolate: 2 } },
  { name: 'Nikka Yoichi', country: 'Japan', region: 'Hokkaido', lat: 43.078, lng: 140.974, type: 'japanese', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 5, peaty: 4, fruity: 5, floral: 3, spicy: 5, sweet: 5, oaky: 5, maritime: 4, vanilla: 4, chocolate: 3 } },
  { name: 'Nikka Miyagikyo', country: 'Japan', region: 'Miyagi', lat: 38.272, lng: 140.534, type: 'japanese', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 2, peaty: 1, fruity: 7, floral: 7, spicy: 3, sweet: 6, oaky: 4, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Chichibu', country: 'Japan', region: 'Saitama', lat: 35.993, lng: 139.086, type: 'japanese', category: 'single_malt', expressionCount: 40, flavorBase: { smoky: 3, peaty: 2, fruity: 6, floral: 5, spicy: 5, sweet: 6, oaky: 5, maritime: 2, vanilla: 6, chocolate: 4 } },
  { name: 'Mars Shinshu', country: 'Japan', region: 'Nagano', lat: 35.816, lng: 137.907, type: 'japanese', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'White Oak Akashi', country: 'Japan', region: 'Hyogo', lat: 34.650, lng: 135.000, type: 'japanese', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 3, vanilla: 6, chocolate: 3 } },
  { name: 'Kanosuke', country: 'Japan', region: 'Kagoshima', lat: 31.536, lng: 130.413, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 7, floral: 6, spicy: 3, sweet: 7, oaky: 4, maritime: 3, vanilla: 7, chocolate: 2 } },
  { name: 'Nagahama', country: 'Japan', region: 'Shiga', lat: 35.381, lng: 136.261, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 4, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Fuji Gotemba', country: 'Japan', region: 'Shizuoka', lat: 35.310, lng: 138.888, type: 'japanese', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 6, spicy: 3, sweet: 7, oaky: 4, maritime: 1, vanilla: 7, chocolate: 2 } },
  { name: 'Tsunuki', country: 'Japan', region: 'Kagoshima', lat: 31.368, lng: 130.302, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 3, peaty: 2, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 2, vanilla: 6, chocolate: 3 } },
  { name: 'Sakurao', country: 'Japan', region: 'Hiroshima', lat: 34.330, lng: 132.305, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 4, maritime: 2, vanilla: 6, chocolate: 3 } },
  { name: 'Shizuoka', country: 'Japan', region: 'Shizuoka', lat: 34.977, lng: 138.383, type: 'japanese', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 3, peaty: 2, fruity: 6, floral: 5, spicy: 4, sweet: 5, oaky: 5, maritime: 2, vanilla: 5, chocolate: 3 } },
  { name: 'Akkeshi', country: 'Japan', region: 'Hokkaido', lat: 43.046, lng: 144.843, type: 'japanese', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 5, peaty: 4, fruity: 5, floral: 3, spicy: 4, sweet: 5, oaky: 5, maritime: 6, vanilla: 4, chocolate: 3 } },
  { name: 'Eigashima', country: 'Japan', region: 'Hyogo', lat: 34.630, lng: 134.963, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 3, vanilla: 6, chocolate: 3 } },
  { name: 'Miyashita', country: 'Japan', region: 'Okayama', lat: 34.655, lng: 133.918, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 4, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Helios', country: 'Japan', region: 'Okinawa', lat: 26.456, lng: 127.770, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 5, spicy: 3, sweet: 7, oaky: 4, maritime: 4, vanilla: 7, chocolate: 2 } },
  { name: 'Saburomaru', country: 'Japan', region: 'Toyama', lat: 36.636, lng: 136.899, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 4, peaty: 3, fruity: 5, floral: 4, spicy: 5, sweet: 5, oaky: 5, maritime: 2, vanilla: 5, chocolate: 3 } },
  { name: 'Okayama', country: 'Japan', region: 'Okayama', lat: 34.661, lng: 133.934, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Komagatake', country: 'Japan', region: 'Nagano', lat: 35.775, lng: 137.830, type: 'japanese', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 3, peaty: 2, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 1, vanilla: 5, chocolate: 3 } },
]

const IRISH: DistilleryTemplate[] = [
  { name: 'Redbreast', country: 'Ireland', region: 'County Cork', lat: 51.928, lng: -8.635, type: 'irish', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 4, spicy: 5, sweet: 7, oaky: 6, maritime: 1, vanilla: 6, chocolate: 4 } },
  { name: 'Jameson', country: 'Ireland', region: 'County Cork', lat: 51.895, lng: -8.480, type: 'irish', category: 'other', expressionCount: 35, flavorBase: { smoky: 0, peaty: 0, fruity: 6, floral: 4, spicy: 4, sweet: 7, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Green Spot', country: 'Ireland', region: 'County Cork', lat: 51.927, lng: -8.636, type: 'irish', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 0, peaty: 0, fruity: 7, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Teeling', country: 'Ireland', region: 'Dublin', lat: 53.336, lng: -6.279, type: 'irish', category: 'single_malt', expressionCount: 28, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 4, spicy: 5, sweet: 6, oaky: 5, maritime: 1, vanilla: 6, chocolate: 4 } },
  { name: 'Midleton', country: 'Ireland', region: 'County Cork', lat: 51.911, lng: -8.175, type: 'irish', category: 'single_malt', expressionCount: 30, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 5, spicy: 4, sweet: 7, oaky: 6, maritime: 0, vanilla: 7, chocolate: 3 } },
  { name: 'Bushmills', country: 'Ireland', region: 'County Antrim', lat: 55.204, lng: -6.521, type: 'irish', category: 'single_malt', expressionCount: 28, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 5, spicy: 3, sweet: 7, oaky: 5, maritime: 2, vanilla: 7, chocolate: 3 } },
  { name: 'Connemara', country: 'Ireland', region: 'County Louth', lat: 53.825, lng: -6.376, type: 'irish', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 6, peaty: 5, fruity: 5, floral: 3, spicy: 4, sweet: 5, oaky: 5, maritime: 3, vanilla: 5, chocolate: 3 } },
  { name: 'Powers', country: 'Ireland', region: 'County Cork', lat: 51.929, lng: -8.637, type: 'irish', category: 'other', expressionCount: 22, flavorBase: { smoky: 1, peaty: 0, fruity: 5, floral: 3, spicy: 5, sweet: 6, oaky: 5, maritime: 0, vanilla: 6, chocolate: 3 } },
  { name: 'Tullamore D.E.W.', country: 'Ireland', region: 'County Offaly', lat: 53.272, lng: -7.494, type: 'irish', category: 'other', expressionCount: 22, flavorBase: { smoky: 0, peaty: 0, fruity: 6, floral: 4, spicy: 3, sweet: 7, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Dingle', country: 'Ireland', region: 'County Kerry', lat: 52.140, lng: -10.262, type: 'irish', category: 'single_malt', expressionCount: 22, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 3, vanilla: 6, chocolate: 3 } },
  { name: 'West Cork', country: 'Ireland', region: 'County Cork', lat: 51.625, lng: -9.511, type: 'irish', category: 'other', expressionCount: 20, flavorBase: { smoky: 1, peaty: 0, fruity: 6, floral: 4, spicy: 4, sweet: 7, oaky: 4, maritime: 3, vanilla: 7, chocolate: 2 } },
  { name: 'Waterford', country: 'Ireland', region: 'County Waterford', lat: 52.260, lng: -7.110, type: 'irish', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 1, peaty: 0, fruity: 7, floral: 6, spicy: 3, sweet: 6, oaky: 4, maritime: 1, vanilla: 6, chocolate: 2 } },
  { name: 'Kilbeggan', country: 'Ireland', region: 'County Westmeath', lat: 53.371, lng: -7.501, type: 'irish', category: 'other', expressionCount: 20, flavorBase: { smoky: 0, peaty: 0, fruity: 5, floral: 4, spicy: 3, sweet: 7, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
  { name: 'Tyrconnell', country: 'Ireland', region: 'County Louth', lat: 53.826, lng: -6.377, type: 'irish', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 0, peaty: 0, fruity: 6, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 1, vanilla: 7, chocolate: 2 } },
  { name: 'Writers Tears', country: 'Ireland', region: 'County Carlow', lat: 52.836, lng: -6.926, type: 'irish', category: 'other', expressionCount: 20, flavorBase: { smoky: 0, peaty: 0, fruity: 7, floral: 5, spicy: 3, sweet: 6, oaky: 4, maritime: 0, vanilla: 7, chocolate: 2 } },
]

const ISRAELI: DistilleryTemplate[] = [
  { name: 'Milk & Honey', country: 'Israel', region: 'Tel Aviv', lat: 32.055, lng: 34.755, type: 'world', category: 'single_malt', expressionCount: 40, flavorBase: { smoky: 3, peaty: 1, fruity: 6, floral: 4, spicy: 6, sweet: 7, oaky: 5, maritime: 2, vanilla: 7, chocolate: 4 } },
  { name: 'Golan Heights Distillery', country: 'Israel', region: 'Katzrin', lat: 32.991, lng: 35.692, type: 'world', category: 'single_malt', expressionCount: 25, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 5, sweet: 6, oaky: 5, maritime: 1, vanilla: 7, chocolate: 3 } },
  { name: 'Pelter', country: 'Israel', region: 'Upper Galilee', lat: 33.008, lng: 35.525, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 5, floral: 4, spicy: 4, sweet: 7, oaky: 5, maritime: 1, vanilla: 8, chocolate: 3 } },
  { name: 'Legends', country: 'Israel', region: 'Upper Galilee', lat: 33.022, lng: 35.540, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 4, spicy: 5, sweet: 6, oaky: 5, maritime: 1, vanilla: 7, chocolate: 3 } },
  { name: 'Herzl', country: 'Israel', region: 'Jerusalem Hills', lat: 31.765, lng: 35.174, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 7, floral: 5, spicy: 4, sweet: 6, oaky: 4, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Jezreel Valley', country: 'Israel', region: 'Jezreel Valley', lat: 32.625, lng: 35.318, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 5, sweet: 6, oaky: 5, maritime: 1, vanilla: 6, chocolate: 3 } },
  { name: 'Acre', country: 'Israel', region: 'Western Galilee', lat: 32.927, lng: 35.068, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 4, spicy: 5, sweet: 6, oaky: 5, maritime: 3, vanilla: 6, chocolate: 3 } },
  { name: 'Negev', country: 'Israel', region: 'Negev', lat: 30.590, lng: 34.797, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 3, peaty: 1, fruity: 5, floral: 3, spicy: 6, sweet: 6, oaky: 6, maritime: 1, vanilla: 6, chocolate: 4 } },
  { name: 'The Maltman Israel', country: 'Israel', region: 'Haifa', lat: 32.794, lng: 34.990, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 3, peaty: 2, fruity: 5, floral: 4, spicy: 5, sweet: 5, oaky: 5, maritime: 3, vanilla: 5, chocolate: 3 } },
  { name: 'Twelve Tribes', country: 'Israel', region: 'Judean Hills', lat: 31.712, lng: 35.063, type: 'world', category: 'single_malt', expressionCount: 20, flavorBase: { smoky: 2, peaty: 1, fruity: 6, floral: 5, spicy: 4, sweet: 6, oaky: 5, maritime: 1, vanilla: 7, chocolate: 3 } },
]

// ─── Expression Generation ─────────────────────────────────────────────────────

const CASK_TYPES = [
  'Ex-Bourbon', 'Ex-Sherry Oloroso', 'Ex-Sherry PX', 'Port Pipe',
  'Rum Cask', 'Wine Cask', 'Virgin Oak', 'Mizunara',
  'Madeira Cask', 'Marsala Cask', 'Cognac Cask', 'Beer Cask',
  'STR Cask', 'Refill Hogshead', 'First Fill Bourbon', 'Moscatel Cask'
]

const AGE_OPTIONS = [null, 10, 12, 15, 18, 21, 25, 30] // null = NAS
const AGE_WEIGHTS = [0.25, 0.20, 0.20, 0.15, 0.10, 0.05, 0.03, 0.02]

function pickAge(): number | null {
  const r = rng()
  let cumulative = 0
  for (let i = 0; i < AGE_OPTIONS.length; i++) {
    cumulative += AGE_WEIGHTS[i]
    if (r < cumulative) return AGE_OPTIONS[i]
  }
  return AGE_OPTIONS[0]
}

const EXPRESSION_SUFFIXES_NAS = [
  'Classic', 'Original', 'Signature', 'Core Range',
  'Select', 'Reserve', 'Small Batch', 'Triple Cask',
  'Double Wood', 'Founders Reserve', 'Quarter Cask',
  'Batch Strength', 'Exclusive', 'Limited Release',
  'Cask Strength', 'Special Edition'
]

const EXPRESSION_SUFFIXES_AGED = [
  'Year Old', 'Year Matured', 'Year'
]

function generateExpressionName(distilleryName: string, age: number | null, cask: string, index: number): string {
  if (age !== null) {
    const suffix = pick(EXPRESSION_SUFFIXES_AGED)
    if (rng() > 0.5) {
      return `${distilleryName} ${age} ${suffix} ${cask}`
    }
    return `${distilleryName} ${age} ${suffix}`
  }
  const suffix = pick(EXPRESSION_SUFFIXES_NAS)
  if (rng() > 0.7) {
    return `${distilleryName} ${suffix} ${cask}`
  }
  return `${distilleryName} ${suffix}`
}

function generateFlavorProfile(base: Record<string, number>, cask: string, age: number | null): Record<string, number> {
  const profile: Record<string, number> = {}
  for (const [key, value] of Object.entries(base)) {
    let adjusted = value + randomInt(-2, 2)
    // Cask type influences
    if (cask.includes('Sherry') || cask.includes('PX')) {
      if (key === 'fruity') adjusted += 1
      if (key === 'sweet') adjusted += 1
      if (key === 'chocolate') adjusted += 1
    }
    if (cask.includes('Port') || cask.includes('Wine')) {
      if (key === 'fruity') adjusted += 2
      if (key === 'sweet') adjusted += 1
    }
    if (cask.includes('Bourbon') || cask.includes('Virgin Oak')) {
      if (key === 'vanilla') adjusted += 2
      if (key === 'oaky') adjusted += 1
    }
    if (cask.includes('Mizunara')) {
      if (key === 'spicy') adjusted += 1
      if (key === 'floral') adjusted += 1
    }
    // Age influences
    if (age !== null && age >= 18) {
      if (key === 'oaky') adjusted += 1
      if (key === 'sweet') adjusted += 1
    }
    profile[key] = Math.max(0, Math.min(10, adjusted))
  }
  return profile
}

// ─── Main Seeding Logic ────────────────────────────────────────────────────────

const ALL_DISTILLERIES: DistilleryTemplate[] = [
  ...SCOTTISH_ISLAY,
  ...SCOTTISH_HIGHLAND,
  ...SCOTTISH_SPEYSIDE,
  ...SCOTTISH_LOWLAND,
  ...SCOTTISH_CAMPBELTOWN,
  ...AMERICAN,
  ...JAPANESE,
  ...IRISH,
  ...ISRAELI,
]

async function insertBatch<T extends Record<string, unknown>>(
  table: any,
  records: T[],
  chunkSize: number = 100
): Promise<{ id: number }[]> {
  const allIds: { id: number }[] = []
  for (let i = 0; i < records.length; i += chunkSize) {
    const chunk = records.slice(i, i + chunkSize)
    const result = await db.insert(table).values(chunk as any).returning({ id: (table as any).id })
    allIds.push(...result)
  }
  return allIds
}

async function main() {
  const startTime = Date.now()
  console.log('=== Caskit Pre-Seed Script ===')
  console.log(`Generating data for ${ALL_DISTILLERIES.length} distilleries...`)
  console.log('')

  // Step 1: Insert all distilleries
  const distilleryRecords = ALL_DISTILLERIES.map((d) => ({
    name: d.name,
    slug: slugify(d.name),
    country: d.country,
    region: d.region,
    lat: d.lat,
    lng: d.lng,
    website: `https://www.${slugify(d.name)}.com`,
    description: `${d.name} distillery located in ${d.region}, ${d.country}. Producing quality ${d.type} whisky.`,
    verified: true,
  }))

  console.log(`Inserting ${distilleryRecords.length} distilleries...`)
  const distilleryIds = await insertBatch(distilleries, distilleryRecords)
  console.log(`Inserted ${distilleryIds.length} distilleries.`)

  // Step 2: Generate bottles and expressions for each distillery
  let totalExpressions = 0
  let totalBottles = 0

  const allBottleRecords: Array<{
    distilleryId: number
    name: string
    slug: string
    type: string
    category: string
  }> = []

  const bottleToDistilleryIdx: number[] = []

  for (let dIdx = 0; dIdx < ALL_DISTILLERIES.length; dIdx++) {
    const template = ALL_DISTILLERIES[dIdx]
    const distilleryId = distilleryIds[dIdx].id
    const expressionCount = template.expressionCount

    // Each bottle maps to multiple expressions (age variants, cask finishes)
    const bottleCount = expressionCount

    for (let b = 0; b < bottleCount; b++) {
      const age = pickAge()
      const cask = pick(CASK_TYPES)
      const bottleName = generateExpressionName(template.name, age, cask, b)
      const bottleSlug = slugify(`${template.name}-${bottleName}-${b}`)

      allBottleRecords.push({
        distilleryId,
        name: bottleName,
        slug: bottleSlug.slice(0, 120), // ensure slug length
        type: template.type,
        category: template.category,
      })
      bottleToDistilleryIdx.push(dIdx)
    }
  }

  console.log(`Inserting ${allBottleRecords.length} bottles...`)
  const bottleIds = await insertBatch(bottles, allBottleRecords, 100)
  totalBottles = bottleIds.length
  console.log(`Inserted ${totalBottles} bottles.`)

  // Step 3: Generate expressions for each bottle
  const allExpressionRecords: Array<{
    bottleId: number
    name: string
    slug: string
    ageYears: number | null
    abv: number
    caskType: string
    isLimitedEdition: boolean
    releaseYear: number
    chillFiltered: boolean
    naturalColor: boolean
    flavorProfile: Record<string, number>
    description: string
    avgCommunityScore: number
    reviewCount: number
  }> = []

  for (let bIdx = 0; bIdx < bottleIds.length; bIdx++) {
    const bottleId = bottleIds[bIdx].id
    const dIdx = bottleToDistilleryIdx[bIdx]
    const template = ALL_DISTILLERIES[dIdx]

    // 2-5 expressions per bottle (age variants, cask finishes, limited editions)
    const exprCount = randomInt(2, 5)
    for (let e = 0; e < exprCount; e++) {
      const age = pickAge()
      const cask = pick(CASK_TYPES)
      const abv = randomFloat(40.0, 63.0, 1)
      const name = generateExpressionName(template.name, age, cask, bIdx * 10 + e)
      const slug = slugify(`${name}-${bIdx}-${e}`)
      const isLimited = rng() > 0.85
      const releaseYear = randomInt(2015, 2025)
      const chillFiltered = rng() > 0.6
      const naturalColor = rng() > 0.4
      const flavorProfile = generateFlavorProfile(template.flavorBase, cask, age)
      const avgScore = randomFloat(72, 96, 1)
      const reviewCount = randomInt(5, 3000)

      allExpressionRecords.push({
        bottleId,
        name,
        slug: slug.slice(0, 120),
        ageYears: age,
        abv,
        caskType: cask,
        isLimitedEdition: isLimited,
        releaseYear,
        chillFiltered,
        naturalColor,
        flavorProfile,
        description: `${name} - ${abv}% ABV, matured in ${cask} casks${age ? ` for ${age} years` : ''}. ${template.region}, ${template.country}.`,
        avgCommunityScore: avgScore,
        reviewCount,
      })
    }
  }

  totalExpressions = allExpressionRecords.length
  console.log(`Inserting ${totalExpressions} expressions...`)

  const expressionIds: { id: number }[] = []
  for (let i = 0; i < allExpressionRecords.length; i += 100) {
    const chunk = allExpressionRecords.slice(i, i + 100)
    const result = await db.insert(expressions).values(chunk as any).returning({ id: expressions.id })
    expressionIds.push(...result)

    if ((i + 100) % 1000 === 0 || i + 100 >= allExpressionRecords.length) {
      console.log(`  Seeded ${Math.min(i + 100, allExpressionRecords.length)}/${totalExpressions} expressions...`)
    }
  }

  // Step 4: Generate perceptual hashes for all expressions
  console.log(`Generating perceptual hashes for ${expressionIds.length} expressions...`)
  const hashRecords = expressionIds.map((expr) => ({
    hashValue: generateHexHash(),
    expressionId: expr.id,
    confidence: randomFloat(0.85, 1.0, 3),
    hitCount: randomInt(0, 50),
  }))

  await insertBatch(perceptualHashes, hashRecords, 100)
  console.log(`Inserted ${hashRecords.length} perceptual hashes.`)

  // Summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
  console.log('')
  console.log('=== Pre-Seed Complete ===')
  console.log(`  Distilleries: ${distilleryIds.length}`)
  console.log(`  Bottles:      ${totalBottles}`)
  console.log(`  Expressions:  ${totalExpressions}`)
  console.log(`  Hashes:       ${hashRecords.length}`)
  console.log(`  Time:         ${elapsed}s`)
  console.log('')
  console.log('Breakdown by country:')
  console.log(`  Scotland:      ${SCOTTISH_ISLAY.length + SCOTTISH_HIGHLAND.length + SCOTTISH_SPEYSIDE.length + SCOTTISH_LOWLAND.length + SCOTTISH_CAMPBELTOWN.length} distilleries`)
  console.log(`  United States: ${AMERICAN.length} distilleries`)
  console.log(`  Japan:         ${JAPANESE.length} distilleries`)
  console.log(`  Ireland:       ${IRISH.length} distilleries`)
  console.log(`  Israel:        ${ISRAELI.length} distilleries`)
}

main().catch((err) => {
  console.error('Pre-seed failed:', err)
  process.exit(1)
})
