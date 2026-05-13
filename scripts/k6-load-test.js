/**
 * k6 Load Testing Script for Caskit
 * Run: k6 run scripts/k6-load-test.js
 * With custom base URL: k6 run -e BASE_URL=https://staging.caskit.app scripts/k6-load-test.js
 */

import http from 'k6/http'
import { check, sleep, group } from 'k6'
import { SharedArray } from 'k6/data'
import { Rate, Trend } from 'k6/metrics'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000'

const errorRate = new Rate('errors')
const browseLatency = new Trend('browse_latency')
const scanLatency = new Trend('scan_latency')
const collectionLatency = new Trend('collection_latency')
const searchLatency = new Trend('search_latency')

export const options = {
  scenarios: {
    browse_flow: {
      executor: 'constant-vus',
      vus: 50,
      duration: '5m',
      exec: 'browseFlow',
      tags: { scenario: 'browse' },
    },
    scan_flow: {
      executor: 'constant-vus',
      vus: 10,
      duration: '5m',
      exec: 'scanFlow',
      tags: { scenario: 'scan' },
    },
    collection_flow: {
      executor: 'constant-vus',
      vus: 20,
      duration: '5m',
      exec: 'collectionFlow',
      tags: { scenario: 'collection' },
    },
    search_flow: {
      executor: 'constant-vus',
      vus: 20,
      duration: '5m',
      exec: 'searchFlow',
      tags: { scenario: 'search' },
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    errors: ['rate<0.01'],
    browse_latency: ['p(95)<3000'],
    scan_latency: ['p(95)<3000'],
    collection_latency: ['p(95)<3000'],
    search_latency: ['p(95)<3000'],
  },
}

const SEARCH_TERMS = [
  'lagavulin', 'macallan', 'islay', 'bourbon', 'sherry',
  'peated', 'highland', 'japanese', 'irish', 'speyside',
  'cask strength', 'single malt', 'limited edition', 'rye',
  'nikka', 'ardbeg', 'milk honey', 'port', 'smoky',
  '18 year', '12 year', 'yamazaki', 'springbank', 'talisker',
]

let bottleSlugs = []

export function setup() {
  console.log(`Load test starting against: ${BASE_URL}`)
  console.log('Fetching available bottle slugs...')

  const res = http.get(`${BASE_URL}/api/expressions?limit=200`)
  if (res.status === 200) {
    try {
      const data = JSON.parse(res.body)
      if (Array.isArray(data)) {
        bottleSlugs = data.map((item) => item.slug).filter(Boolean)
      } else if (data.data && Array.isArray(data.data)) {
        bottleSlugs = data.data.map((item) => item.slug).filter(Boolean)
      }
    } catch (e) {
      console.log('Could not parse expressions response, using fallback slugs')
    }
  }

  if (bottleSlugs.length === 0) {
    bottleSlugs = [
      'lagavulin-16-standard',
      'mh-apex-dead-sea-terroir',
      'mh-apex-jerusalem-terroir',
      'pelter-single-malt-10y',
    ]
  }

  console.log(`Setup complete. Using ${bottleSlugs.length} bottle slugs.`)
  return { slugs: bottleSlugs }
}

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function browseFlow(data) {
  const slugs = data.slugs || bottleSlugs

  group('Browse Flow', function () {
    // Step 1: Visit homepage
    const homeRes = http.get(`${BASE_URL}/`)
    check(homeRes, {
      'homepage status 200': (r) => r.status === 200,
    })
    errorRate.add(homeRes.status !== 200)
    browseLatency.add(homeRes.timings.duration)
    sleep(1 + Math.random() * 2)

    // Step 2: Visit a random bottle detail page
    const slug = randomElement(slugs)
    const bottleRes = http.get(`${BASE_URL}/bottle/${slug}`)
    check(bottleRes, {
      'bottle page status 200 or 404': (r) => r.status === 200 || r.status === 404,
    })
    errorRate.add(bottleRes.status >= 500)
    browseLatency.add(bottleRes.timings.duration)
    sleep(2 + Math.random() * 3)

    // Step 3: Visit explore page
    const exploreRes = http.get(`${BASE_URL}/explore`)
    check(exploreRes, {
      'explore page status 200': (r) => r.status === 200,
    })
    errorRate.add(exploreRes.status !== 200)
    browseLatency.add(exploreRes.timings.duration)
    sleep(1 + Math.random() * 2)
  })
}

export function scanFlow() {
  group('Scan Flow', function () {
    // Simulate image scan with a base64 test payload
    const testPayload = JSON.stringify({
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      method: 'phash',
    })

    const scanRes = http.post(`${BASE_URL}/api/scan`, testPayload, {
      headers: { 'Content-Type': 'application/json' },
    })

    check(scanRes, {
      'scan response valid': (r) => r.status === 200 || r.status === 401 || r.status === 429,
    })
    errorRate.add(scanRes.status >= 500)
    scanLatency.add(scanRes.timings.duration)
    sleep(3 + Math.random() * 5)
  })
}

export function collectionFlow() {
  group('Collection Flow', function () {
    // Step 1: GET collection (may require auth)
    const getRes = http.get(`${BASE_URL}/api/collection`, {
      headers: { 'Content-Type': 'application/json' },
    })
    check(getRes, {
      'collection GET valid': (r) => r.status === 200 || r.status === 401,
    })
    errorRate.add(getRes.status >= 500)
    collectionLatency.add(getRes.timings.duration)
    sleep(1 + Math.random() * 2)

    // Step 2: POST to collection (add item, may require auth)
    const postPayload = JSON.stringify({
      expressionId: Math.floor(Math.random() * 1000) + 1,
      status: 'wishlist',
    })

    const postRes = http.post(`${BASE_URL}/api/collection`, postPayload, {
      headers: { 'Content-Type': 'application/json' },
    })
    check(postRes, {
      'collection POST valid': (r) => r.status === 200 || r.status === 201 || r.status === 401 || r.status === 409,
    })
    errorRate.add(postRes.status >= 500)
    collectionLatency.add(postRes.timings.duration)
    sleep(2 + Math.random() * 3)
  })
}

export function searchFlow() {
  group('Search Flow', function () {
    const term = randomElement(SEARCH_TERMS)
    const searchRes = http.get(`${BASE_URL}/search?q=${encodeURIComponent(term)}`)

    check(searchRes, {
      'search status 200': (r) => r.status === 200,
      'search has body': (r) => r.body && r.body.length > 0,
    })
    errorRate.add(searchRes.status >= 500)
    searchLatency.add(searchRes.timings.duration)
    sleep(2 + Math.random() * 3)
  })
}

export function teardown(data) {
  console.log('')
  console.log('=== Load Test Summary ===')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`Bottle slugs used: ${(data.slugs || []).length}`)
  console.log('Scenarios executed:')
  console.log('  - Browse Flow:     50 VUs x 5min')
  console.log('  - Scan Flow:       10 VUs x 5min')
  console.log('  - Collection Flow: 20 VUs x 5min')
  console.log('  - Search Flow:     20 VUs x 5min')
  console.log('')
  console.log('Check the k6 output above for detailed metrics.')
  console.log('Thresholds: p95 < 3000ms, error rate < 1%')
}
