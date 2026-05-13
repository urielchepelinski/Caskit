'use client'

import { useState } from 'react'
import { Camera, Compass, Library } from 'lucide-react'

const features = [
  {
    icon: Camera,
    title: 'Scan',
    description: 'Point your camera at any bottle and instantly identify it',
  },
  {
    icon: Compass,
    title: 'Discover',
    description: 'Explore tasting notes, distillery stories, and expert scores',
  },
  {
    icon: Library,
    title: 'Collect',
    description: 'Build your personal whiskey shelf and track your journey',
  },
]

export default function LandingPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error)
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1A1612] px-6 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="font-display text-5xl font-bold text-[#F5F0EB]">
          Caskit
        </h1>
        <p className="mt-3 font-story text-lg text-[#A89B8C]">
          Discover every whiskey&apos;s story
        </p>

        <div className="mt-12 space-y-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-4 text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#2A2420]">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F5F0EB]">
                  {feature.title}
                </h3>
                <p className="mt-0.5 text-sm text-[#A89B8C]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-12">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-sm border border-[#A89B8C]/20 bg-[#2A2420] px-4 py-3 text-sm text-[#F5F0EB] placeholder-[#A89B8C]/60 outline-none focus:border-accent"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="shrink-0 rounded-sm bg-accent px-5 py-3 text-sm font-semibold text-[#1A1612] transition-colors hover:bg-accent-dark disabled:opacity-60"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
          {status === 'success' && (
            <p className="mt-3 text-sm text-green-400">{message}</p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-sm text-red-400">{message}</p>
          )}
        </form>

        <p className="mt-6 text-xs text-[#A89B8C]/60">
          Join 1,000+ whiskey enthusiasts
        </p>
      </div>
    </div>
  )
}
