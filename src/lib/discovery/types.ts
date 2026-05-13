export interface NearbyPlace {
  name: string
  type: 'distillery' | 'shop'
  lat: number
  lng: number
  distance: number
  rating?: number
  address?: string
}
