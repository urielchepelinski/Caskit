'use client'

import { SessionProvider } from 'next-auth/react'
import { ToastProvider } from '@/components/ui/toast'
import { SplashScreen } from '@/components/splash-screen'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      <ToastProvider>
        <SplashScreen>{children}</SplashScreen>
      </ToastProvider>
    </SessionProvider>
  )
}
