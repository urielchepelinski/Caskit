'use client'

import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)

      const visits = parseInt(localStorage.getItem('caskit_visits') || '0', 10)
      localStorage.setItem('caskit_visits', String(visits + 1))

      if (visits >= 2 && !localStorage.getItem('caskit_install_dismissed')) {
        setShowPrompt(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('caskit_install_dismissed', 'true')
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-[398px] mx-auto bg-white rounded-card shadow-elevated border border-border p-4 z-40 animate-slide-up">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">Add Caskit to Home Screen</h3>
          <p className="text-xs text-text-secondary mt-0.5">Quick access to scan bottles anytime</p>
        </div>
        <button onClick={handleDismiss} className="p-1">
          <X className="w-4 h-4 text-text-muted" />
        </button>
      </div>
      <button
        onClick={handleInstall}
        className="w-full mt-3 py-2.5 bg-text-primary text-white rounded-sm text-xs font-semibold"
      >
        Install App
      </button>
    </div>
  )
}
