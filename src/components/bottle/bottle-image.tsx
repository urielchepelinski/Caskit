'use client'

import { useState } from 'react'
import { BottlePlaceholder } from './bottle-placeholder'

interface BottleImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  placeholderClassName?: string
}

export function BottleImage({ src, alt, className = 'h-[85%] w-auto object-contain', placeholderClassName = 'w-6 h-12' }: BottleImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return <BottlePlaceholder className={placeholderClassName} />
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  )
}
