'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

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

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentStep = QUIZ_STEPS[step]
  const isLast = step === QUIZ_STEPS.length - 1

  const handleSelect = async (value: string) => {
    const keys = ['preferredStyle', 'smokiness', 'sweetness', 'occasion']
    const newAnswers = { ...answers, [keys[step]]: value }
    setAnswers(newAnswers)

    if (isLast) {
      await fetch('/api/user/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnswers),
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
          {QUIZ_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= step ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-text-muted mb-2">
          {step + 1} of {QUIZ_STEPS.length}
        </p>
        <h1 className="text-2xl font-bold mb-8">{currentStep.question}</h1>
      </div>

      <div className="space-y-3">
        {currentStep.options.map((option) => (
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

      <button
        onClick={() => router.push('/')}
        className="mt-auto mb-8 text-sm text-text-muted text-center py-3"
      >
        Skip for now
      </button>
    </div>
  )
}
