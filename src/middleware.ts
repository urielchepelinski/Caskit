import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

const PROTECTED_ROUTES = ['/shelf', '/profile', '/settings']
const SCAN_LIMIT_COOKIE = 'caskit_scans'
const MAX_ANONYMOUS_SCANS = 3

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (pathname === '/api/scan' && request.method === 'POST') {
    const session = await auth()
    if (!session?.user) {
      const scanCount = parseInt(request.cookies.get(SCAN_LIMIT_COOKIE)?.value || '0', 10)
      if (scanCount >= MAX_ANONYMOUS_SCANS) {
        return NextResponse.json(
          { error: 'signup_required', message: 'Create a free account to continue scanning' },
          { status: 403 }
        )
      }
      const response = NextResponse.next()
      response.cookies.set(SCAN_LIMIT_COOKIE, String(scanCount + 1), {
        maxAge: 60 * 60 * 24 * 30,
      })
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/shelf/:path*', '/profile/:path*', '/settings/:path*', '/api/scan'],
}
