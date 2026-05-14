'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, MapPin, Loader2 } from 'lucide-react'

interface QuizStep {
  question: string
  options: { value: string; label: string; emoji: string }[]
}

const QUIZ_STEPS: QuizStep[] = [
  {
    question: "What's your whiskey style?",
    options: [
      { value: 'scotch', label: 'Scotch', emoji: '\u{1F3F4}' },
      { value: 'bourbon', label: 'Bourbon', emoji: '\u{1F1FA}\u{1F1F8}' },
      { value: 'irish', label: 'Irish', emoji: '\u{1F1EE}\u{1F1EA}' },
      { value: 'japanese', label: 'Japanese', emoji: '\u{1F1EF}\u{1F1F5}' },
      { value: 'exploring', label: 'Still exploring', emoji: '\u{1F30D}' },
    ],
  },
  {
    question: 'How do you feel about smoke?',
    options: [
      { value: 'love', label: 'Love it \u2014 the smokier the better', emoji: '\u{1F525}' },
      { value: 'some', label: 'A hint is nice', emoji: '\u{1F4A8}' },
      { value: 'none', label: 'Keep it smooth', emoji: '\u2728' },
      { value: 'unsure', label: 'Not sure yet', emoji: '\u{1F914}' },
    ],
  },
  {
    question: 'Sweet or dry?',
    options: [
      { value: 'sweet', label: 'Sweet \u2014 honey, vanilla, caramel', emoji: '\u{1F36F}' },
      { value: 'dry', label: 'Dry \u2014 oak, leather, tobacco', emoji: '\u{1FAB5}' },
      { value: 'balanced', label: 'Balanced \u2014 best of both', emoji: '\u2696\uFE0F' },
      { value: 'unsure', label: 'Surprise me', emoji: '\u{1F3B2}' },
    ],
  },
  {
    question: 'When do you usually drink whiskey?',
    options: [
      { value: 'relaxing', label: 'Relaxing at home', emoji: '\u{1F6CB}\uFE0F' },
      { value: 'social', label: 'Social gatherings', emoji: '\u{1F943}' },
      { value: 'food', label: 'With a great meal', emoji: '\u{1F37D}\uFE0F' },
      { value: 'special', label: 'Special occasions', emoji: '\u{1F389}' },
    ],
  },
]

/** Top whiskey markets for the country picker */
const POPULAR_COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'FR', name: 'France' },
  { code: 'IL', name: 'Israel' },
  { code: 'IN', name: 'India' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'SG', name: 'Singapore' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'ZA', name: 'South Africa' },
]

function countryFlag(code: string): string {
  const offset = 0x1F1E6 - 65
  return String.fromCodePoint(code.charCodeAt(0) + offset, code.charCodeAt(1) + offset)
}

export default function OnboardingPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<'country' | 'quiz'>('country')
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)
  const [detectedCity, setDetectedCity] = useState<string | null>(null)
  const [geoLoading, setGeoLoading] = useState(true)
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null)

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  // Auto-detect country on mount
  useEffect(() => {
    fetch('/api/geo')
      .then(r => r.json())
      .then(data => {
        if (data.country) {
          setDetectedCountry(data.country)
          setSelectedCountry(data.country)
        }
        if (data.city) setDetectedCity(data.city)
        if (data.lat && data.lng) setGeoCoords({ lat: data.lat, lng: data.lng })
      })
      .catch(() => {})
      .finally(() => setGeoLoading(false))
  }, [])

  const handleCountryConfirm = () => {
    if (selectedCountry) {
      setPhase('quiz')
    }
  }

  const totalSteps = QUIZ_STEPS.length + 1 // country + quiz steps
  const currentStepNum = phase === 'country' ? 1 : step + 2

  const handleSelect = async (value: string) => {
    const keys = ['preferredStyle', 'smokiness', 'sweetness', 'occasion']
    const newAnswers = { ...answers, [keys[step]]: value }
    setAnswers(newAnswers)

    const isLast = step === QUIZ_STEPS.length - 1
    if (isLast) {
      await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newAnswers,
          country: selectedCountry,
          city: detectedCity,
          lat: geoCoords?.lat,
          lng: geoCoords?.lng,
        }),
      })
      router.push('/')
    } else {
      setStep(step + 1)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 pt-16">
      <div className="mb-2">
        <div className="flex gap-1.5 mb-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i < currentStepNum ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-text-muted mb-2">
          {currentStepNum} of {totalSteps}
        </p>

        {phase === 'country' ? (
          <h1 className="text-2xl font-bold mb-8">Where are you based?</h1>
        ) : (
          <h1 className="text-2xl font-bold mb-8">{QUIZ_STEPS[step].question}</h1>
        )}
      </div>

      {phase === 'country' ? (
        <div className="space-y-3 flex-1">
          {geoLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 animate-spin text-accent" />
              <span className="ml-2 text-sm text-text-muted">Detecting your location...</span>
            </div>
          ) : (
            <>
              {detectedCountry && (
                <div className="mb-4">
                  <p className="text-xs text-text-muted mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Detected{detectedCity ? ` \u2014 ${detectedCity}` : ''}
                  </p>
                  <button
                    onClick={() => { setSelectedCountry(detectedCountry); handleCountryConfirm() }}
                    className="w-full p-4 bg-surface border-2 border-accent rounded-card flex items-center gap-3 text-left"
                  >
                    <span className="text-xl">{countryFlag(detectedCountry)}</span>
                    <span className="flex-1 text-sm font-medium">
                      {POPULAR_COUNTRIES.find(c => c.code === detectedCountry)?.name || detectedCountry}
                    </span>
                    <ChevronRight className="w-4 h-4 text-accent" />
                  </button>
                </div>
              )}

              <p className="text-xs text-text-muted mb-2">
                {detectedCountry ? 'Or choose your country:' : 'Select your country:'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_COUNTRIES
                  .filter(c => c.code !== detectedCountry)
                  .map((country) => (
                    <button
                      key={country.code}
                      onClick={() => { setSelectedCountry(country.code); }}
                      className={`p-3 bg-surface border rounded-card flex items-center gap-2 text-left transition-colors ${
                        selectedCountry === country.code ? 'border-accent' : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <span className="text-base">{countryFlag(country.code)}</span>
                      <span className="text-xs font-medium truncate">{country.name}</span>
                    </button>
                  ))}
              </div>

              {selectedCountry && selectedCountry !== detectedCountry && (
                <button
                  onClick={handleCountryConfirm}
                  className="w-full mt-4 p-3 bg-accent text-white rounded-card text-sm font-medium"
                >
                  Continue
                </button>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {QUIZ_STEPS[step].options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="w-full p-4 bg-surface border border-border rounded-card flex items-center gap-3 text-left hover:border-accent transition-colors"
            >
              <span className="text-xl">{option.emoji}</span>
              <span className="flex-1 text-sm font-medium">{option.label}</span>
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => router.push('/')}
        className="mt-auto mb-8 text-sm text-text-muted text-center py-3"
      >
        Skip for now
      </button>
    </div>
  )
}
