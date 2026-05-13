'use client'

import { useEffect } from 'react'
import { initAnalytics, identifyUser } from '@/lib/analytics'
import { useSession } from 'next-auth/react'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    if (session?.user?.id) {
      identifyUser(session.user.id, {
        email: session.user.email,
        name: session.user.name,
      })
    }
  }, [session])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return <>{children}</>
}
