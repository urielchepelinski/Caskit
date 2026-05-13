'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CameraCapture } from '@/components/scan/camera-capture'
import { ScanLoading } from '@/components/scan/scan-loading'
import { ScanResult } from '@/components/scan/scan-result'
import { ManualSearch } from '@/components/scan/manual-search'
import { BottomNav } from '@/components/layout/bottom-nav'
import { ArrowLeft, HelpCircle, Search, RotateCcw } from 'lucide-react'

type ScanState = 'idle' | 'capturing' | 'processing' | 'result' | 'manual-search' | 'error'

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
  const [state, setState] = useState<ScanState>('capturing')
  const [scanData, setScanData] = useState<ScanData | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleCapture = useCallback(async (imageBlob: Blob) => {
    setState('processing')
    setErrorMessage('')

    try {
      const formData = new FormData()
      formData.append('image', imageBlob, 'scan.jpg')

      const response = await fetch('/api/scan', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Scan failed' }))
        throw new Error(err.error || 'Scan failed')
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
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Recognition failed')
      setState('error')
    }
  }, [])

  const handleRetry = useCallback(() => {
    setScanData(null)
    setErrorMessage('')
    setState('capturing')
  }, [])

  const handleManualSearch = useCallback(() => {
    setState('manual-search')
  }, [])

  const handleSearchResult = useCallback((result: {
    expressionId: number
    name: string
    slug: string
    imageUrl?: string
    distillery?: string
  }) => {
    setScanData({
      expressionId: result.expressionId,
      confidence: 1.0,
      method: 'manual',
      bottle: {
        name: result.name,
        slug: result.slug,
        imageUrl: result.imageUrl || '',
        distillery: result.distillery || '',
      },
    })
    setState('result')
  }, [])

  if (state === 'capturing' || state === 'idle') {
    return (
      <CameraCapture
        onCapture={handleCapture}
        onClose={() => router.back()}
        onManualSearch={handleManualSearch}
      />
    )
  }

  if (state === 'manual-search') {
    return (
      <div className="min-h-screen bg-background">
        <header className="flex items-center gap-3 px-5 pt-4 pb-3">
          <button onClick={handleRetry} className="p-1">
            <ArrowLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
          </button>
          <h1 className="text-lg font-bold">Search Bottle</h1>
        </header>
        <ManualSearch onSelect={handleSearchResult} />
        <BottomNav active="scan" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={handleRetry} className="p-1">
          <ArrowLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-lg font-bold">Scan Result</h1>
      </header>

      {state === 'processing' && <ScanLoading />}

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
          onManualSearch={handleManualSearch}
          onRetry={handleRetry}
        />
      )}

      {state === 'error' && (
        <div className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-text-muted" />
          </div>
          <h2 className="text-lg font-bold mb-2">Couldn&apos;t identify this bottle</h2>
          <p className="text-sm text-text-secondary mb-6">
            {errorMessage || 'Try searching for it manually or scan again with better lighting.'}
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleManualSearch}
              className="w-full py-3 bg-accent text-white rounded-card text-sm font-medium flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search manually
            </button>
            <button
              onClick={handleRetry}
              className="w-full py-3 bg-surface rounded-card border border-border text-sm font-medium text-text-secondary flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Scan again
            </button>
          </div>
        </div>
      )}

      <BottomNav active="scan" />
    </div>
  )
}
