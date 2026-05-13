'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CameraCapture } from '@/components/scan/camera-capture'
import { ScanLoading } from '@/components/scan/scan-loading'
import { ScanResult } from '@/components/scan/scan-result'
import { BottomNav } from '@/components/layout/bottom-nav'
import { ArrowLeft } from 'lucide-react'

type ScanState = 'camera' | 'loading' | 'result' | 'error'

interface ScanData {
  expressionId: number | null
  confidence: number
  method: string
  bottle?: {
    name: string
    slug: string
    imageUrl: string
    distillery: string
  }
  suggestions?: { expressionId: number; name: string; confidence: number }[]
}

export default function ScanPage() {
  const router = useRouter()
  const [state, setState] = useState<ScanState>('camera')
  const [scanData, setScanData] = useState<ScanData | null>(null)

  const handleCapture = async (imageBlob: Blob) => {
    setState('loading')

    try {
      const formData = new FormData()
      formData.append('image', imageBlob, 'scan.jpg')

      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Scan failed')
      }

      const result = await response.json()

      if (result.expressionId) {
        const exprResponse = await fetch(`/api/expressions/${result.expressionId}`)
        if (exprResponse.ok) {
          const expr = await exprResponse.json()
          setScanData({
            expressionId: result.expressionId,
            confidence: result.confidence,
            method: result.method,
            bottle: {
              name: expr.name,
              slug: expr.slug,
              imageUrl: expr.imageUrl,
              distillery: expr.distillery?.name,
            },
            suggestions: result.suggestions,
          })
        } else {
          setScanData(result)
        }
      } else {
        setScanData(result)
      }

      setState('result')
    } catch {
      setState('error')
    }
  }

  const handleRetry = () => {
    setScanData(null)
    setState('camera')
  }

  if (state === 'camera') {
    return <CameraCapture onCapture={handleCapture} onClose={() => router.back()} />
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={handleRetry} className="p-1">
          <ArrowLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-lg font-bold">Scan Result</h1>
      </header>

      {state === 'loading' && <ScanLoading />}

      {state === 'result' && scanData && (
        <ScanResult
          expressionId={scanData.expressionId}
          confidence={scanData.confidence}
          method={scanData.method}
          bottleName={scanData.bottle?.name}
          bottleSlug={scanData.bottle?.slug}
          bottleImage={scanData.bottle?.imageUrl}
          distillery={scanData.bottle?.distillery}
          suggestions={scanData.suggestions}
        />
      )}

      {state === 'error' && (
        <div className="p-8 text-center">
          <p className="text-text-secondary mb-4">Something went wrong. Please try again.</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-accent text-white rounded-card font-medium"
          >
            Scan Again
          </button>
        </div>
      )}

      <BottomNav active="scan" />
    </div>
  )
}
