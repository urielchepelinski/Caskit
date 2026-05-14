import { db } from '@/db'
import { distilleries } from '@/db/schema'
import { isNotNull } from 'drizzle-orm'
import { haversineDistance, type Coordinates } from '@/lib/geo/distance'
import type { NearbyPlace } from './types'

/**
 * Find distilleries near a given lat/lng using Haversine distance.
 * Queries all distilleries with coordinates, calculates distance in JS,
 * and returns the closest ones within the radius.
 */
export async function getNearbyDistilleries(
  lat: number,
  lng: number,
  radiusKm = 200
): Promise<NearbyPlace[]> {
  const allDistilleries = await db.select()
    .from(distilleries)
    .where(isNotNull(distilleries.lat))

  const userCoords: Coordinates = { lat, lng }

  const withDistance = allDistilleries
    .filter(d => d.lat != null && d.lng != null)
    .map(d => ({
      name: d.name,
      type: 'distillery' as const,
      lat: d.lat!,
      lng: d.lng!,
      distance: haversineDistance(userCoords, { lat: d.lat!, lng: d.lng! }),
      address: d.region ? `${d.region}, ${d.country}` : d.country,
    }))
    .filter(d => d.distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)

  return withDistance.slice(0, 10)
}

/**
 * Placeholder for nearby shops — will use Google Places API in a future phase.
 * For now returns empty array.
 */
export async function getNearbyShops(
  _lat: number,
  _lng: number,
  _radiusKm = 10
): Promise<NearbyPlace[]> {
  return []
}
