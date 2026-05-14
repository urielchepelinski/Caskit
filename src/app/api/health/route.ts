import { NextResponse } from 'next/server'

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL
  const hasAuthSecret = !!process.env.AUTH_SECRET
  const hasGoogleId = !!process.env.AUTH_GOOGLE_ID

  return NextResponse.json({
    status: 'ok',
    env: { hasDbUrl, hasAuthSecret, hasGoogleId },
    time: new Date().toISOString(),
  })
}
