import { headers } from 'next/headers'

export interface UserGeo {
  country: string | null // ISO 3166-1 alpha-2
  city: string | null
  lat: number | null
  lng: number | null
}

/**
 * Extract country code from Vercel deployment headers.
 * Vercel automatically provides geo headers on Edge/Serverless.
 */
export async function getCountryFromHeaders(): Promise<string | null> {
  const h = await headers()
  return h.get('x-vercel-ip-country') || null
}

/**
 * Get full geo info from Vercel headers (available on deployed environments).
 */
export async function getUserGeo(): Promise<UserGeo> {
  const h = await headers()
  const lat = h.get('x-vercel-ip-latitude')
  const lng = h.get('x-vercel-ip-longitude')

  return {
    country: h.get('x-vercel-ip-country') || null,
    city: h.get('x-vercel-ip-city') || null,
    lat: lat ? parseFloat(lat) : null,
    lng: lng ? parseFloat(lng) : null,
  }
}
