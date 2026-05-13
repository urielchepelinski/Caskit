import { NextRequest, NextResponse } from 'next/server'
import { recognizeBottle } from '@/lib/recognition'
import { db } from '@/db'
import { expressions, bottles, distilleries, scans } from '@/db/schema'
import { ilike, eq, or } from 'drizzle-orm'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      return handleTextSearch(request)
    }

    return handleImageScan(request)
  } catch (error) {
    console.error('Scan error:', error)
    return NextResponse.json({ error: 'Recognition failed' }, { status: 500 })
  }
}

async function handleImageScan(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('image') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No image provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Use JPEG, PNG, or WebP.' }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large. Maximum 10MB.' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const result = await recognizeBottle(buffer)

  try {
    const [scan] = await db.insert(scans).values({
      expressionId: result.expressionId,
      recognitionMethod: result.method,
      confidence: result.confidence,
      rawResult: result.rawData ?? null,
    }).returning()

    return NextResponse.json({
      scanId: scan.id,
      expressionId: result.expressionId,
      confidence: result.confidence,
      method: result.method,
      suggestions: result.suggestions,
    })
  } catch {
    return NextResponse.json({
      expressionId: result.expressionId,
      confidence: result.confidence,
      method: result.method,
      suggestions: result.suggestions,
    })
  }
}

async function handleTextSearch(request: NextRequest) {
  const body = await request.json()
  const { query } = body as { query?: string }

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ error: 'Search query too short' }, { status: 400 })
  }

  const searchTerm = `%${query.trim()}%`

  const results = await db.select({
    expression: expressions,
    bottle: bottles,
    distillery: distilleries,
  })
    .from(expressions)
    .innerJoin(bottles, eq(expressions.bottleId, bottles.id))
    .innerJoin(distilleries, eq(bottles.distilleryId, distilleries.id))
    .where(
      or(
        ilike(expressions.name, searchTerm),
        ilike(bottles.name, searchTerm),
        ilike(distilleries.name, searchTerm),
      )
    )
    .limit(10)

  const mapped = results.map(({ expression, bottle, distillery }) => ({
    expressionId: expression.id,
    name: expression.name,
    slug: expression.slug,
    imageUrl: expression.imageUrl,
    distillery: distillery.name,
    bottleType: bottle.type,
    category: bottle.category,
  }))

  return NextResponse.json({
    results: mapped,
    query: query.trim(),
  })
}
