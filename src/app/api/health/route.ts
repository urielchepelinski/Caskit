import { NextResponse } from 'next/server'

export async function GET() {
  const googleId = process.env.AUTH_GOOGLE_ID || ''
  const googleSecret = process.env.AUTH_GOOGLE_SECRET || ''

  return NextResponse.json({
    status: 'ok',
    env: {
      hasDbUrl: !!process.env.DATABASE_URL,
      hasAuthSecret: !!process.env.AUTH_SECRET,
      authSecretLength: (process.env.AUTH_SECRET || '').length,
      hasGoogleId: !!process.env.AUTH_GOOGLE_ID,
      googleIdPrefix: googleId.slice(0, 10),
      hasGoogleSecret: !!process.env.AUTH_GOOGLE_SECRET,
      googleSecretPrefix: googleSecret.slice(0, 6),
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      nextAuthUrl: process.env.NEXTAUTH_URL || '(not set)',
    },
    time: new Date().toISOString(),
  })
}
