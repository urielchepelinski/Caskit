'use client'

import { useEffect, useRef } from 'react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={(e) => { if (e.target === backdropRef.current) onClose() }}
    >
      <div className="absolute inset-0 bg-black/40 animate-[fadeIn_150ms_ease-out]" />
      <div className="relative w-full max-w-[430px] bg-background rounded-t-2xl animate-[slideUp_200ms_ease-out] pb-safe">
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-border">
          <h3 className="text-base font-bold text-text-primary">{title}</h3>
          <button onClick={onClose} className="text-text-muted text-sm font-medium">
            Close
          </button>
        </div>
        <div className="px-5 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
