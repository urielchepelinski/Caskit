'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Crown, Zap } from 'lucide-react'

interface ConversionNudgeProps {
  trigger: 'scan_10' | 'rate_5' | 'price_add' | 'compare'
}

const NUDGE_MESSAGES: Record<string, { title: string; message: string }> = {
  scan_10: {
    title: 'Your AI Sommelier is ready',
    message: "You've scanned 10 bottles! Upgrade to get personalized recommendations based on your taste profile.",
  },
  rate_5: {
    title: 'Your flavor profile is rich',
    message: "With 5+ ratings, we can give you amazing personalized picks. Try the AI Sommelier!",
  },
  price_add: {
    title: 'Track market value?',
    message: "Premium members get price tracking, alerts when bottles drop in price, and collection valuation.",
  },
  compare: {
    title: 'Try side-by-side mode',
    message: "Compare tasting notes, flavor profiles, and scores of any two bottles with Premium.",
  },
}

export function ConversionNudge({ trigger }: ConversionNudgeProps) {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem(`caskit_nudge_${trigger}`)
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  const handleDismiss = () => {
    setVisible(false)
    localStorage.setItem(`caskit_nudge_${trigger}`, 'true')
  }

  if (!visible) return null

  const { title, message } = NUDGE_MESSAGES[trigger]

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-[398px] mx-auto bg-gradient-to-r from-accent/10 to-accent/5 rounded-card shadow-elevated border border-accent/20 p-4 z-40">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Crown className="w-4 h-4 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">{message}</p>
        </div>
        <button onClick={handleDismiss} className="p-1">
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => router.push('/premium')}
          className="flex-1 py-2 bg-accent text-white rounded-sm text-xs font-semibold flex items-center justify-center gap-1"
        >
          <Zap className="w-3 h-3" /> See Premium
        </button>
        <button
          onClick={handleDismiss}
          className="px-3 py-2 text-xs text-text-muted"
        >
          Not now
        </button>
      </div>
    </div>
  )
}
