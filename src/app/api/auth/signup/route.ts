import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { hashPassword } from '@/lib/auth/password'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 })
    }

    // Check if user already exists
    const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const userId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    const [newUser] = await db.insert(users).values({
      id: userId,
      email,
      name: name || email.split('@')[0],
      passwordHash: hashedPassword,
    }).returning()

    return NextResponse.json({
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
