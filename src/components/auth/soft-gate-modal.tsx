'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Sparkles } from 'lucide-react'

interface SoftGateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SoftGateModal({ isOpen, onClose }: SoftGateModalProps) {
  const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl p-6 pb-10 animate-slide-up">
        <div className="flex justify-end mb-2">
          <button onClick={onClose} className="p-1">
            <X className="w-5 h-5 text-text-muted" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-accent" />
          </div>
          <h2 className="text-xl font-bold mb-2">You're on a roll!</h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            Create a free account to save your scans, build your collection, and join the whiskey community.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/login')}
            className="w-full py-3.5 bg-text-primary text-white rounded-card text-sm font-semibold"
          >
            Create Free Account
          </button>
          <button
            onClick={onClose}
            className="w-full py-3 text-sm text-text-muted"
          >
            Maybe later
          </button>
        </div>

        <p className="text-xs text-text-muted text-center mt-4">
          Free forever. Unlimited scanning & community access.
        </p>
      </div>
    </div>
  )
}
