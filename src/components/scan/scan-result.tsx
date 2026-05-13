'use client'

import { Star, Plus, Check, HelpCircle, Search, RotateCcw } from 'lucide-react'
import Link from 'next/link'

interface ScanResultProps {
  expressionId: number | null
  confidence: number
  method: string
  bottleName?: string
  bottleSlug?: string
  bottleImage?: string
  distillery?: string
  suggestions?: { expressionId: number; name: string; confidence: number }[]
  onManualSearch?: () => void
  onRetry?: () => void
}

export function ScanResult({
  expressionId,
  confidence,
  method,
  bottleName,
  bottleSlug,
  bottleImage,
  distillery,
  suggestions,
  onManualSearch,
  onRetry,
}: ScanResultProps) {
  if (!expressionId || confidence < 0.6) {
    return (
      <div className="p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface flex items-center justify-center">
          <HelpCircle className="w-8 h-8 text-text-muted" />
        </div>
        <h2 className="text-lg font-bold mb-2">Not sure about this one</h2>
        <p className="text-sm text-text-secondary mb-6">
          We couldn&apos;t confidently identify this bottle.
          {suggestions && suggestions.length > 0 ? ' Is it one of these?' : ' Try searching manually.'}
        </p>
        {suggestions && suggestions.length > 0 && (
          <div className="space-y-3 mb-6">
            {suggestions.map((s) => (
              <Link
                key={s.expressionId}
                href={`/bottle/${s.expressionId}`}
                className="w-full p-3 bg-surface rounded-card border border-border text-left flex justify-between items-center block"
              >
                <span className="text-sm font-medium">{s.name}</span>
                <span className="text-xs text-text-muted">{Math.round(s.confidence * 100)}%</span>
              </Link>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-3">
          {onManualSearch && (
            <button
              onClick={onManualSearch}
              className="w-full py-3 bg-accent text-white rounded-card text-sm font-medium flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              Search manually
            </button>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full py-3 bg-surface rounded-card border border-border text-sm font-medium text-text-secondary flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Scan again
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 mb-3 rounded-full bg-accent/10 flex items-center justify-center">
          <Check className="w-6 h-6 text-accent" />
        </div>
        <p className="text-xs text-text-muted mb-1">
          Identified via {method === 'cache' ? 'instant match' : method === 'vision_api' ? 'AI analysis' : method === 'manual' ? 'manual search' : method}
        </p>
      </div>

      <Link
        href={`/bottle/${bottleSlug}`}
        className="block bg-surface rounded-card border border-border p-4 mb-6"
      >
        <div className="flex gap-4 items-center">
          {bottleImage && (
            <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-background flex items-center justify-center">
              <img src={bottleImage} alt={bottleName} className="h-[90%] w-auto object-contain" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-lg font-bold mb-1">{bottleName}</h2>
            {distillery && (
              <p className="text-sm text-text-secondary">{distillery}</p>
            )}
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              <span className="text-sm font-semibold">4.6</span>
              <span className="text-xs text-text-muted">community</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="flex gap-3">
        <button className="flex-1 py-3 bg-accent text-white rounded-card text-sm font-semibold flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Add to Shelf
        </button>
        <Link
          href={`/bottle/${bottleSlug}`}
          className="flex-1 py-3 bg-surface border border-border rounded-card text-sm font-medium text-center flex items-center justify-center"
        >
          View Details
        </Link>
      </div>

      {onManualSearch && (
        <button
          onClick={onManualSearch}
          className="w-full mt-4 py-2 text-sm text-text-muted flex items-center justify-center gap-2"
        >
          <Search className="w-3.5 h-3.5" />
          Not the right bottle? Search manually
        </button>
      )}
    </div>
  )
}
