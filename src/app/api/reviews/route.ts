import { NextRequest, NextResponse } from 'next/server'
import { submitReview, getExpressionReviews } from '@/lib/community'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const expressionId = searchParams.get('expressionId')

  if (!expressionId) {
    return NextResponse.json({ error: 'expressionId is required' }, { status: 400 })
  }

  try {
    const reviews = await getExpressionReviews(Number(expressionId))
    return NextResponse.json(reviews)
  } catch (error) {
    console.error('Failed to load reviews:', error)
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { expressionId, score, nose, palate, finish, liked } = body

  if (!expressionId || typeof score !== 'number') {
    return NextResponse.json({ error: 'expressionId and score are required' }, { status: 400 })
  }

  if (score < 1 || score > 100) {
    return NextResponse.json({ error: 'Score must be between 1 and 100' }, { status: 400 })
  }

  const review = await submitReview(userId, {
    expressionId,
    score,
    nose,
    palate,
    finish,
    liked,
  })

  return NextResponse.json(review, { status: 201 })
}
