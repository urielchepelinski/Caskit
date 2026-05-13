'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'caskit_age_verified'
const COOKIE_NAME = 'age_verified'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60

export function AgeGate() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY)
    if (!verified) {
      setVisible(true)
    }
  }, [])

  function handleConfirm() {
    localStorage.setItem(STORAGE_KEY, 'true')
    document.cookie = `${COOKIE_NAME}=true; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
    setVisible(false)
  }

  function handleReject() {
    window.location.href = 'https://www.google.com'
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-sm rounded-card bg-background p-8 text-center shadow-elevated">
        <h1 className="font-display text-2xl font-semibold text-text-primary">
          Welcome to Caskit
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-text-muted">
          You must be of legal drinking age to access this app
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={handleConfirm}
            className="w-full rounded-sm bg-accent py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            I am 18 or older
          </button>
          <button
            onClick={handleReject}
            className="w-full rounded-sm border border-border py-3 text-sm font-medium text-text-muted transition-colors hover:border-text-muted"
          >
            I am under 18
          </button>
        </div>
      </div>
    </div>
  )
}
