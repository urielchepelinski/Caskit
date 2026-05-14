/**
 * Geo utilities for location-adaptive features.
 * - Country detection from Vercel headers
 * - Haversine distance calculation
 * - Country display names and currency mapping
 */

export { getCountryFromHeaders, getUserGeo } from './detect'
export { haversineDistance, type Coordinates } from './distance'
export { getCountryName, getCurrencyForCountry, getCountryFlag } from './countries'
