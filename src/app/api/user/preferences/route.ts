import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { country, city, lat, lng, ...preferences } = body

    const update: Record<string, unknown> = { preferences, updatedAt: new Date() }
    if (country) update.country = country
    if (city) update.city = city
    if (lat != null) update.lat = lat
    if (lng != null) update.lng = lng

    await db.update(users)
      .set(update)
      .where(eq(users.id, session.user.id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update preferences:', error)
    return NextResponse.json({ error: 'Failed to update preferences' }, { status: 500 })
  }
}
