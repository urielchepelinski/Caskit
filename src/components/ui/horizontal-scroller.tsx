'use client'

import { useRef, useCallback, type ReactNode } from 'react'

interface HorizontalScrollerProps {
  children: ReactNode
  className?: string
}

export function HorizontalScroller({ children, className = '' }: HorizontalScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDown.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    scrollRef.current.style.cursor = 'grabbing'
  }, [])

  const handleMouseLeave = useCallback(() => {
    isDown.current = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }, [])

  const handleMouseUp = useCallback(() => {
    isDown.current = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }, [])

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`flex gap-3.5 overflow-x-auto px-5 pb-1 cursor-grab select-none scrollbar-hide ${className}`}
      style={{ WebkitOverflowScrolling: 'touch', scrollSnapType: 'x proximity' }}
    >
      {children}
    </div>
  )
}
