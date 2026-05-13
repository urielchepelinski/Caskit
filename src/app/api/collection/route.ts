import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { collections } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userCollections = await db.select()
    .from(collections)
    .where(eq(collections.userId, userId))
    .orderBy(collections.addedAt)

  return NextResponse.json(userCollections)
}

export async function POST(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { expressionId, status, purchasePrice, purchaseLocation, personalNotes } = body

  if (!expressionId || !status) {
    return NextResponse.json({ error: 'expressionId and status are required' }, { status: 400 })
  }

  if (!['owned', 'wishlist', 'tasted'].includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
  }

  try {
    const [item] = await db.insert(collections).values({
      userId,
      expressionId,
      status,
      purchasePrice,
      purchaseLocation,
      personalNotes,
    }).onConflictDoUpdate({
      target: [collections.userId, collections.expressionId],
      set: { status, purchasePrice, purchaseLocation, personalNotes },
    }).returning()

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Failed to add to collection:', error)
    return NextResponse.json({ error: 'Failed to add to collection' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const userId = request.headers.get('x-user-id')
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const expressionId = searchParams.get('expressionId')

  if (!expressionId) {
    return NextResponse.json({ error: 'expressionId is required' }, { status: 400 })
  }

  try {
    await db.delete(collections).where(
      and(eq(collections.userId, userId), eq(collections.expressionId, Number(expressionId)))
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to remove from collection:', error)
    return NextResponse.json({ error: 'Failed to remove from collection' }, { status: 500 })
  }
}
