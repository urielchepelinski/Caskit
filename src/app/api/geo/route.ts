import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

/**
 * GET /api/geo
 * Returns the user's detected country/city/coordinates from Vercel geo headers.
 * Used by the client to auto-detect location during onboarding.
 */
export async function GET() {
  const h = await headers()

  const country = h.get('x-vercel-ip-country') || null
  const city = h.get('x-vercel-ip-city') || null
  const lat = h.get('x-vercel-ip-latitude')
  const lng = h.get('x-vercel-ip-longitude')

  return NextResponse.json({
    country,
    city,
    lat: lat ? parseFloat(lat) : null,
    lng: lng ? parseFloat(lng) : null,
  })
}
