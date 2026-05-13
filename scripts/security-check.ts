/**
 * Security Audit Script for Caskit
 * Scans API routes for input validation, auth checks, and rate limiting.
 * Scans components for potential XSS vectors.
 * Run: tsx scripts/security-check.ts
 */

import * as fs from 'fs'
import * as path from 'path'

// ─── Types ─────────────────────────────────────────────────────────────────────

type CheckStatus = 'PASS' | 'WARN' | 'FAIL'

interface RouteCheck {
  route: string
  filePath: string
  inputValidation: CheckStatus
  authCheck: CheckStatus
  rateLimiting: CheckStatus
  details: string[]
}

interface XSSCheck {
  filePath: string
  status: CheckStatus
  occurrences: number
  details: string[]
}

interface SecurityReport {
  timestamp: string
  routeChecks: RouteCheck[]
  xssChecks: XSSCheck[]
  summary: {
    totalRoutes: number
    passCount: number
    warnCount: number
    failCount: number
    xssVulnerabilities: number
  }
}

// ─── File Discovery ────────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(__dirname, '..')
const SRC_DIR = path.join(PROJECT_ROOT, 'src')
const APP_DIR = path.join(SRC_DIR, 'app')
const API_DIR = path.join(APP_DIR, 'api')

function findFiles(dir: string, pattern: RegExp): string[] {
  const results: string[] = []

  if (!fs.existsSync(dir)) return results

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next') continue
        walk(fullPath)
      } else if (pattern.test(entry.name)) {
        results.push(fullPath)
      }
    }
  }

  walk(dir)
  return results
}

function findApiRoutes(): string[] {
  return findFiles(API_DIR, /route\.(ts|tsx|js|jsx)$/)
}

function findComponents(): string[] {
  return findFiles(APP_DIR, /\.(tsx|jsx)$/)
}

// ─── Security Checks ───────────────────────────────────────────────────────────

const VALIDATION_PATTERNS = [
  /import.*zod/i,
  /import.*z\s*from\s*['"]zod['"]/,
  /z\.object\(/,
  /z\.string\(/,
  /\.parse\(/,
  /\.safeParse\(/,
  /schema\./i,
  /validate/i,
  /joi\./i,
  /yup\./i,
]

const AUTH_PATTERNS = [
  /getSession/,
  /requireAuth/,
  /getServerSession/,
  /auth\(\)/,
  /session/i,
  /NextAuth/,
  /getToken/,
  /middleware/i,
  /withAuth/,
  /isAuthenticated/,
]

const RATELIMIT_PATTERNS = [
  /ratelimit/i,
  /rate.?limit/i,
  /@upstash\/ratelimit/,
  /Ratelimit/,
  /limiter/i,
  /throttle/i,
]

const XSS_PATTERNS = [
  /dangerouslySetInnerHTML/,
]

function checkInputValidation(content: string): { status: CheckStatus; details: string[] } {
  const details: string[] = []
  let hasValidation = false

  for (const pattern of VALIDATION_PATTERNS) {
    if (pattern.test(content)) {
      hasValidation = true
      details.push(`Found validation: ${pattern.source}`)
      break
    }
  }

  // Check if route has POST/PUT/PATCH (needs validation more urgently)
  const hasMutatingMethod = /export\s+(?:async\s+)?function\s+(POST|PUT|PATCH|DELETE)/i.test(content)

  if (hasValidation) {
    return { status: 'PASS', details }
  }

  if (hasMutatingMethod) {
    details.push('Mutating route (POST/PUT/PATCH/DELETE) without apparent input validation')
    return { status: 'FAIL', details }
  }

  details.push('No explicit validation found (GET-only route)')
  return { status: 'WARN', details }
}

function checkAuth(content: string, routePath: string): { status: CheckStatus; details: string[] } {
  const details: string[] = []

  // Webhook routes and auth routes are exempt
  if (routePath.includes('webhook') || routePath.includes('[...nextauth]')) {
    details.push('Auth exempt (webhook/auth route)')
    return { status: 'PASS', details }
  }

  let hasAuth = false
  for (const pattern of AUTH_PATTERNS) {
    if (pattern.test(content)) {
      hasAuth = true
      details.push(`Found auth check: ${pattern.source}`)
      break
    }
  }

  if (hasAuth) {
    return { status: 'PASS', details }
  }

  // Public routes (GET only) may not need auth
  const hasOnlyGet = /export\s+(?:async\s+)?function\s+GET/i.test(content) &&
    !/export\s+(?:async\s+)?function\s+(POST|PUT|PATCH|DELETE)/i.test(content)

  if (hasOnlyGet) {
    details.push('GET-only route without auth (may be intentionally public)')
    return { status: 'WARN', details }
  }

  details.push('No auth check found on mutating route')
  return { status: 'FAIL', details }
}

function checkRateLimiting(content: string): { status: CheckStatus; details: string[] } {
  const details: string[] = []

  for (const pattern of RATELIMIT_PATTERNS) {
    if (pattern.test(content)) {
      details.push(`Found rate limiting: ${pattern.source}`)
      return { status: 'PASS', details }
    }
  }

  details.push('No rate limiting found')
  return { status: 'WARN', details }
}

function checkXSS(content: string, filePath: string): XSSCheck {
  const details: string[] = []
  let occurrences = 0

  for (const pattern of XSS_PATTERNS) {
    const matches = content.match(new RegExp(pattern.source, 'g'))
    if (matches) {
      occurrences += matches.length
      details.push(`Found ${matches.length}x dangerouslySetInnerHTML usage`)
    }
  }

  const status: CheckStatus = occurrences > 0 ? 'WARN' : 'PASS'
  return { filePath, status, occurrences, details }
}

// ─── Main ──────────────────────────────────────────────────────────────────────

function getRouteLabel(filePath: string): string {
  const relative = path.relative(API_DIR, filePath)
  return '/api/' + relative
    .replace(/\\/g, '/')
    .replace(/\/route\.(ts|tsx|js|jsx)$/, '')
}

function main() {
  console.log('=== Caskit Security Audit ===')
  console.log(`Scanning: ${SRC_DIR}`)
  console.log(`Timestamp: ${new Date().toISOString()}`)
  console.log('')

  // Check API routes
  const apiRoutes = findApiRoutes()
  console.log(`Found ${apiRoutes.length} API routes`)
  console.log('')

  const routeChecks: RouteCheck[] = []

  for (const routeFile of apiRoutes) {
    const content = fs.readFileSync(routeFile, 'utf-8')
    const routeLabel = getRouteLabel(routeFile)

    const validation = checkInputValidation(content)
    const auth = checkAuth(content, routeFile)
    const rateLimit = checkRateLimiting(content)

    routeChecks.push({
      route: routeLabel,
      filePath: routeFile,
      inputValidation: validation.status,
      authCheck: auth.status,
      rateLimiting: rateLimit.status,
      details: [...validation.details, ...auth.details, ...rateLimit.details],
    })
  }

  // Print route check results
  console.log('─── API Route Security Checks ───')
  console.log('')
  console.log(`${'Route'.padEnd(45)} ${'Validation'.padEnd(12)} ${'Auth'.padEnd(12)} ${'Rate Limit'.padEnd(12)}`)
  console.log('─'.repeat(81))

  for (const check of routeChecks) {
    const validIcon = statusIcon(check.inputValidation)
    const authIcon = statusIcon(check.authCheck)
    const rateIcon = statusIcon(check.rateLimiting)
    console.log(
      `${check.route.padEnd(45)} ${validIcon.padEnd(12)} ${authIcon.padEnd(12)} ${rateIcon.padEnd(12)}`
    )
  }

  // Check components for XSS
  console.log('')
  console.log('─── XSS Check (dangerouslySetInnerHTML) ───')
  console.log('')

  const componentFiles = findComponents()
  const xssChecks: XSSCheck[] = []

  for (const compFile of componentFiles) {
    const content = fs.readFileSync(compFile, 'utf-8')
    const xssResult = checkXSS(content, compFile)
    if (xssResult.occurrences > 0) {
      xssChecks.push(xssResult)
    }
  }

  if (xssChecks.length === 0) {
    console.log('  No dangerouslySetInnerHTML usage found. [PASS]')
  } else {
    for (const xss of xssChecks) {
      const relative = path.relative(PROJECT_ROOT, xss.filePath)
      console.log(`  [WARN] ${relative} - ${xss.occurrences} occurrence(s)`)
    }
  }

  // Summary
  const passCount = routeChecks.filter(
    (r) => r.inputValidation === 'PASS' && r.authCheck === 'PASS' && r.rateLimiting === 'PASS'
  ).length
  const failCount = routeChecks.filter(
    (r) => r.inputValidation === 'FAIL' || r.authCheck === 'FAIL' || r.rateLimiting === 'FAIL'
  ).length
  const warnCount = routeChecks.length - passCount - failCount

  console.log('')
  console.log('─── Summary ───')
  console.log('')
  console.log(`  Total API routes:    ${routeChecks.length}`)
  console.log(`  All checks PASS:     ${passCount}`)
  console.log(`  Has warnings (WARN): ${warnCount}`)
  console.log(`  Has failures (FAIL): ${failCount}`)
  console.log(`  XSS vulnerabilities: ${xssChecks.length}`)
  console.log('')

  if (failCount > 0) {
    console.log('FAILED routes requiring attention:')
    for (const route of routeChecks) {
      if (route.inputValidation === 'FAIL' || route.authCheck === 'FAIL' || route.rateLimiting === 'FAIL') {
        console.log(`  ${route.route}`)
        for (const detail of route.details) {
          console.log(`    - ${detail}`)
        }
      }
    }
    console.log('')
    process.exit(1)
  }

  if (warnCount > 0) {
    console.log('Routes with warnings (review recommended):')
    for (const route of routeChecks) {
      if (route.inputValidation === 'WARN' || route.authCheck === 'WARN' || route.rateLimiting === 'WARN') {
        console.log(`  ${route.route}`)
      }
    }
    console.log('')
  }

  console.log('Security audit complete.')
}

function statusIcon(status: CheckStatus): string {
  switch (status) {
    case 'PASS': return '[PASS]'
    case 'WARN': return '[WARN]'
    case 'FAIL': return '[FAIL]'
  }
}

main()
