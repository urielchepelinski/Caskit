export interface Coordinates {
  lat: number
  lng: number
}

const EARTH_RADIUS_KM = 6371

/**
 * Calculate distance between two points using the Haversine formula.
 * Returns distance in kilometers.
 */
export function haversineDistance(a: Coordinates, b: Coordinates): number {
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)

  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)

  const h = sinLat * sinLat +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180)
}
