import type { ImageProps } from 'next/image'

interface OptimizationOptions {
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill'
  sizes?: string
  blurDataUrl?: string
}

interface OptimizedImageResult {
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  priority: boolean
  quality: number
  placeholder: ImageProps['placeholder']
  blurDataURL?: string
  style?: { objectFit: string }
}

export function getOptimizedImageProps(
  src: string,
  alt: string,
  options: OptimizationOptions = {}
): OptimizedImageResult {
  const {
    width = 400,
    height = 400,
    priority = false,
    quality = 80,
    objectFit = 'cover',
    sizes,
    blurDataUrl,
  } = options

  const result: OptimizedImageResult = {
    src,
    alt,
    width,
    height,
    sizes: sizes || getResponsiveSizes({ sm: '100vw', md: '50vw', lg: '33vw' }),
    priority,
    quality,
    placeholder: blurDataUrl ? 'blur' : 'empty',
    style: { objectFit },
  }

  if (blurDataUrl) {
    result.blurDataURL = blurDataUrl
  }

  return result
}

export async function generateBlurDataUrl(buffer: Buffer): Promise<string> {
  try {
    const sharp = (await import('sharp')).default
    const resized = await sharp(buffer)
      .resize(10, undefined, { withoutEnlargement: true })
      .jpeg({ quality: 40 })
      .toBuffer()
    return `data:image/jpeg;base64,${resized.toString('base64')}`
  } catch {
    return ''
  }
}

interface BreakpointSizes {
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
  default?: string
}

export function getResponsiveSizes(breakpoints: BreakpointSizes): string {
  const breakpointWidths: Record<string, string> = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }

  const parts: string[] = []

  for (const [bp, size] of Object.entries(breakpoints)) {
    if (bp === 'default') continue
    const minWidth = breakpointWidths[bp]
    if (minWidth && size) {
      parts.push(`(min-width: ${minWidth}) ${size}`)
    }
  }

  parts.push(breakpoints.default || '100vw')

  return parts.join(', ')
}
