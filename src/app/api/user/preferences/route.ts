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

  const preferences = await request.json()

  await db.update(users)
    .set({ preferences, updatedAt: new Date() })
    .where(eq(users.id, session.user.id))

  return NextResponse.json({ success: true })
}
