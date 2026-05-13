'use client'

import Image, { type ImageProps } from 'next/image'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  blurDataUrl?: string
  objectFit?: 'contain' | 'cover' | 'fill'
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  sizes?: string
  quality?: number
  fill?: boolean
  className?: string
}

const roundedClasses: Record<string, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  blurDataUrl,
  objectFit = 'cover',
  rounded = 'lg',
  sizes,
  quality = 80,
  fill = false,
  className = '',
}: OptimizedImageProps) {
  const imageProps: Partial<ImageProps> = {
    src,
    alt,
    quality,
    loading: priority ? undefined : 'lazy',
    priority,
    sizes: sizes || '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
  }

  if (blurDataUrl) {
    imageProps.placeholder = 'blur'
    imageProps.blurDataURL = blurDataUrl
  }

  if (fill) {
    imageProps.fill = true
    imageProps.style = { objectFit }
  } else {
    imageProps.width = width || 400
    imageProps.height = height || 400
    imageProps.style = { objectFit }
  }

  return (
    <Image
      {...(imageProps as ImageProps)}
      className={`${roundedClasses[rounded] || ''} ${className}`.trim()}
    />
  )
}
