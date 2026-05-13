'use client'

import { useEffect } from 'react'
import { captureError } from '@/lib/monitoring'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    captureError(error, {
      component: 'AppError',
      metadata: { digest: error.digest },
    })
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6">
      <div className="text-center">
        <h1 className="mb-2 text-xl font-bold text-text-primary">
          Something went wrong
        </h1>
        <p className="text-sm text-text-muted">
          We encountered an unexpected error. Please try again.
        </p>
      </div>
      <button
        onClick={reset}
        className="rounded-lg bg-[#C8974C] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </div>
  )
}
