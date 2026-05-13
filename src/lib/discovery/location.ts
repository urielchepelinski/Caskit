import type { NearbyPlace } from './types'

export async function getNearbyDistilleries(lat: number, lng: number, radiusKm = 50): Promise<NearbyPlace[]> {
  // Placeholder: will use Google Places API
  return []
}

export async function getNearbyShops(lat: number, lng: number, radiusKm = 10): Promise<NearbyPlace[]> {
  // Placeholder: will use Google Places API
  return []
}
