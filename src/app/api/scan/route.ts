import { NextRequest, NextResponse } from 'next/server'
import { recognizeBottle } from '@/lib/recognition'
import { uploadImage } from '@/lib/images'
import { db } from '@/db'
import { scans } from '@/db/schema'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
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

    // Upload the image
    const upload = await uploadImage(buffer, file.name, file.type)

    // Run recognition pipeline
    const result = await recognizeBottle(buffer)

    // Log the scan
    const [scan] = await db.insert(scans).values({
      expressionId: result.expressionId,
      imageUrl: upload.url,
      thumbnailUrl: upload.thumbnailUrl,
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
  } catch (error) {
    console.error('Scan error:', error)
    return NextResponse.json({ error: 'Recognition failed' }, { status: 500 })
  }
}
