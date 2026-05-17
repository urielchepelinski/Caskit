'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { CameraCapture } from '@/components/scan/camera-capture'
import { ScanLoading } from '@/components/scan/scan-loading'
import { ScanResult } from '@/components/scan/scan-result'
import { ManualSearch } from '@/components/scan/manual-search'
import { BottomNav } from '@/components/layout/bottom-nav'
import { useOcr } from '@/hooks/use-ocr'
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
    rating: number | null
  }
  suggestions?: { expressionId: number; name: string; slug: string; confidence: number }[]
}

export default function ScanPage() {
  const router = useRouter()
  const [state, setState] = useState<ScanState>('capturing')
  const [scanData, setScanData] = useState<ScanData | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [processingStage, setProcessingStage] = useState<string>('')
  const { recognize: ocrRecognize } = useOcr()

  const handleCapture = useCallback(async (imageBlob: Blob) => {
    setState('processing')
    setErrorMessage('')
    setProcessingStage('Reading label text...')

    try {
      // Stage 1: Try FREE client-side OCR first
      const ocrResult = await ocrRecognize(imageBlob)

      if (ocrResult && ocrResult.text.length > 5) {
        setProcessingStage('Matching against database...')

        // Send extracted text to server for fuzzy DB matching (no Vision API cost)
        const textResponse = await fetch('/api/scan/text', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: ocrResult.text }),
        })

        if (textResponse.ok) {
          const textResult = await textResponse.json()

          // If we got a confident match from OCR alone, use it
          if (textResult.expressionId && textResult.confidence >= 0.5) {
            await handleSuccessfulScan(textResult)
            return
          }

          // If we got suggestions but no confident match, try Vision API for better ID
          if (textResult.suggestions?.length > 0 && textResult.confidence >= 0.35) {
            await handleSuccessfulScan(textResult)
            return
          }
        }
      }

      // Stage 2: Fall back to Vision API (costs ~$0.001-0.003)
      setProcessingStage('AI analyzing bottle...')

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
      await handleSuccessfulScan(result)
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Recognition failed')
      setState('error')
    }
  }, [ocrRecognize])

  const handleSuccessfulScan = useCallback(async (result: any) => {
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
            rating: expr.avgCommunityScore ?? null,
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
  }, [])

  const handleRetry = useCallback(() => {
    setScanData(null)
    setErrorMessage('')
    setProcessingStage('')
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
        rating: null,
      },
    })
    setState('result')
  }, [])

  const [shelfStatus, setShelfStatus] = useState<string>('')

  const handleAddToShelf = useCallback(async () => {
    if (!scanData?.expressionId) return
    try {
      const res = await fetch('/api/collection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expressionId: scanData.expressionId, status: 'owned' }),
      })
      if (res.ok) {
        setShelfStatus('Added to shelf!')
        setTimeout(() => setShelfStatus(''), 3000)
      } else {
        const data = await res.json()
        setShelfStatus(data.error === 'Unauthorized' ? 'Sign in to add' : 'Failed to add')
        setTimeout(() => setShelfStatus(''), 3000)
      }
    } catch {
      setShelfStatus('Failed to add')
      setTimeout(() => setShelfStatus(''), 3000)
    }
  }, [scanData])

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
      <div className="min-h-screen bg-background pb-20">
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
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={handleRetry} className="p-1">
          <ArrowLeft className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
        </button>
        <h1 className="text-lg font-bold">Scan Result</h1>
      </header>

      {state === 'processing' && <ScanLoading stage={processingStage} />}

      {state === 'result' && scanData && (
        <>
          <ScanResult
            expressionId={scanData.expressionId}
            confidence={scanData.confidence}
            method={scanData.method}
            bottleName={scanData.bottle?.name}
            bottleSlug={scanData.bottle?.slug}
            bottleImage={scanData.bottle?.imageUrl}
            distillery={scanData.bottle?.distillery}
            rating={scanData.bottle?.rating}
            suggestions={scanData.suggestions}
            onAddToShelf={handleAddToShelf}
            onManualSearch={handleManualSearch}
            onRetry={handleRetry}
          />
          {shelfStatus && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-text-primary text-background px-4 py-2 rounded-full text-sm font-medium shadow-lg z-50">
              {shelfStatus}
            </div>
          )}
        </>
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
