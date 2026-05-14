'use client'

import { useState } from 'react'
import Image from 'next/image'
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
    <Image
      src={src}
      alt={alt}
      width={120}
      height={200}
      className={className}
      onError={() => setFailed(true)}
      unoptimized={src.startsWith('/')}
    />
  )
}
