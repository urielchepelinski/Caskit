'use client'

import { useState } from 'react'

export function PremiumCTA() {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly')
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url } = await response.json()
      if (url) window.location.href = url
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-5">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setPlan('monthly')}
          className={`flex-1 p-3 rounded-card border text-center ${
            plan === 'monthly'
              ? 'border-accent bg-accent/5'
              : 'border-border bg-surface'
          }`}
        >
          <div className="text-sm font-semibold">Monthly</div>
          <div className="text-lg font-bold text-accent">$6.99</div>
          <div className="text-[10px] text-text-muted">/month</div>
        </button>
        <button
          onClick={() => setPlan('yearly')}
          className={`flex-1 p-3 rounded-card border text-center relative ${
            plan === 'yearly'
              ? 'border-accent bg-accent/5'
              : 'border-border bg-surface'
          }`}
        >
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-accent text-white text-[9px] font-bold rounded-full">
            SAVE 29%
          </span>
          <div className="text-sm font-semibold">Yearly</div>
          <div className="text-lg font-bold text-accent">$59.99</div>
          <div className="text-[10px] text-text-muted">/year ($5/mo)</div>
        </button>
      </div>

      <button
        onClick={handleSubscribe}
        disabled={loading}
        className="w-full py-4 bg-accent text-white rounded-card text-sm font-bold disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Start Free Trial'}
      </button>
      <p className="text-[10px] text-text-muted text-center mt-2">
        7-day free trial. Cancel anytime.
      </p>
    </div>
  )
}
