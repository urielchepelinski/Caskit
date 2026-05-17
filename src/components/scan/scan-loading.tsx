'use client'

import { useEffect, useState } from 'react'

const WHISKEY_FACTS = [
  "The word 'whisky' comes from the Gaelic 'uisge beatha' meaning 'water of life'.",
  "A barrel of whisky loses about 2% to evaporation each year — called the 'angel's share'.",
  "Scotland has more barrels of whisky maturing than it has people.",
  "The oldest known whisky was distilled in 1940 and sold for $1.9 million.",
  "Bourbon must be aged in brand-new charred oak barrels by law.",
  "Japanese whisky was inspired by Scotch — the founder studied in Scotland.",
  "Israel's hot climate ages whisky 3x faster than Scotland's cool temperatures.",
  "The color of whisky comes entirely from the barrel — the spirit starts clear.",
]

interface ScanLoadingProps {
  stage?: string
}

export function ScanLoading({ stage }: ScanLoadingProps) {
  const [fact, setFact] = useState('')
  const [dots, setDots] = useState('')

  useEffect(() => {
    setFact(WHISKEY_FACTS[Math.floor(Math.random() * WHISKEY_FACTS.length)])
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
      <div className="w-16 h-16 mb-6 relative">
        <div className="absolute inset-0 rounded-full border-4 border-surface" />
        <div className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent animate-spin" />
      </div>
      <h2 className="text-lg font-semibold mb-2">Analyzing your bottle{dots}</h2>
      {stage && (
        <p className="text-xs text-accent font-medium mb-3">{stage}</p>
      )}
      <p className="text-sm text-text-secondary text-center max-w-[260px] mt-4 font-story italic">
        {fact}
      </p>
    </div>
  )
}
