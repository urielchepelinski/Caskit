'use client'

import { useState } from 'react'
import { BottlePlaceholder } from './bottle-placeholder'

interface BottleImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  placeholderClassName?: string
}

function proxyUrl(src: string): string {
  // Already a relative/internal URL — use as-is
  if (src.startsWith('/')) return src
  // Route external images through our proxy to bypass hotlink blocking
  return `/api/image-proxy?url=${encodeURIComponent(src)}`
}

export function BottleImage({ src, alt, className = 'h-[85%] w-auto object-contain', placeholderClassName = 'w-6 h-12' }: BottleImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <BottlePlaceholder className={placeholderClassName} />
  }

  return (
    <img
      src={proxyUrl(src)}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
