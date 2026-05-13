'use client'

import { useEffect } from 'react'
import { captureError } from '@/lib/monitoring'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    captureError(error, {
      component: 'GlobalError',
      metadata: { digest: error.digest },
    })
  }, [error])

  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FFFFFF', margin: 0 }}>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h1
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1A1612',
                marginBottom: '0.5rem',
              }}
            >
              Something went wrong
            </h1>
            <p style={{ fontSize: '0.875rem', color: '#8A7E72' }}>
              A critical error occurred. Please try again.
            </p>
          </div>
          <button
            onClick={reset}
            style={{
              borderRadius: '0.5rem',
              backgroundColor: '#C8974C',
              padding: '0.75rem 1.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
