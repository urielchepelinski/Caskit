'use client'

import { useState, useCallback, useRef } from 'react'
import { Search, Loader2 } from 'lucide-react'

interface SearchResult {
  expressionId: number
  name: string
  slug: string
  imageUrl?: string
  distillery?: string
  bottleType?: string
  category?: string
}

interface ManualSearchProps {
  onSelect: (result: SearchResult) => void
}

export function ManualSearch({ onSelect }: ManualSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      setHasSearched(false)
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery.trim() }),
      })

      if (response.ok) {
        const data = await response.json()
        setResults(data.results || [])
      } else {
        setResults([])
      }
    } catch {
      setResults([])
    } finally {
      setIsSearching(false)
      setHasSearched(true)
    }
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      performSearch(value)
    }, 400)
  }

  return (
    <div className="px-5 py-4">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Type bottle name, distillery..."
          autoFocus
          className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-card text-sm placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent animate-spin" />
        )}
      </div>

      {!hasSearched && !isSearching && (
        <div className="text-center py-8">
          <p className="text-sm text-text-muted">
            Search by bottle name, distillery, or expression
          </p>
        </div>
      )}

      {hasSearched && results.length === 0 && !isSearching && (
        <div className="text-center py-8">
          <p className="text-sm text-text-secondary mb-1">No matches found</p>
          <p className="text-xs text-text-muted">Try a different spelling or shorter search term</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-2">
          {results.map((result) => (
            <button
              key={result.expressionId}
              onClick={() => onSelect(result)}
              className="w-full p-3 bg-surface rounded-card border border-border text-left flex items-center gap-3 active:border-accent/50 transition-colors"
            >
              {result.imageUrl ? (
                <div className="w-10 h-14 flex-shrink-0 rounded overflow-hidden bg-background flex items-center justify-center">
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="h-[90%] w-auto object-contain"
                  />
                </div>
              ) : (
                <div className="w-10 h-14 flex-shrink-0 rounded bg-background flex items-center justify-center">
                  <span className="text-lg text-text-muted">&#127867;</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{result.name}</p>
                {result.distillery && (
                  <p className="text-xs text-text-muted truncate">{result.distillery}</p>
                )}
                {result.category && (
                  <p className="text-xs text-text-muted capitalize">
                    {result.category.replace('_', ' ')}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
