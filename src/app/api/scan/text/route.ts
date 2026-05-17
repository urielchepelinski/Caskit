import { NextRequest, NextResponse } from 'next/server'
import { recognizeFromText } from '@/lib/recognition'

/**
 * POST /api/scan/text
 * Accepts OCR text from client-side Tesseract.js and does fuzzy DB matching.
 * No Vision API cost — just pg_trgm matching.
 */
export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string' || text.trim().length < 3) {
      return NextResponse.json({ error: 'Text too short' }, { status: 400 })
    }

    const result = await recognizeFromText(text.trim())

    return NextResponse.json({
      expressionId: result.expressionId,
      confidence: result.confidence,
      method: result.method,
      suggestions: result.suggestions,
    })
  } catch (error) {
    console.error('Text scan error:', error)
    return NextResponse.json({ error: 'Recognition failed' }, { status: 500 })
  }
}
