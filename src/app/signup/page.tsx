'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, User } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
        signal: AbortSignal.timeout(30000),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Signup failed')
        setLoading(false)
        return
      }

      // Account created — redirect to login
      router.push('/login?registered=1')
    } catch (err) {
      if (err instanceof DOMException && err.name === 'TimeoutError') {
        setError('Connection timed out. Please check your internet and try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl font-bold text-center text-[#1A1612] mb-2">
          Cas<span className="text-[#C8974C]">kit</span>
        </h1>
        <p className="text-sm text-[#8A7E72] text-center mb-8">
          Create your account to start your whiskey journey.
        </p>

        <button
          onClick={() => signIn('google', { callbackUrl: '/onboarding' })}
          className="w-full py-3 px-4 mb-4 bg-white border border-[#E8E2DA] rounded-xl text-sm font-medium text-gray-800 flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8E2DA]" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-white text-xs text-[#8A7E72]">or</span>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7E72]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              aria-label="Full name"
              autoComplete="name"
              className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8E2DA] rounded-xl text-sm text-[#1A1612] placeholder-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#C8974C] focus:border-[#C8974C]"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7E72]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              aria-label="Email address"
              autoComplete="email"
              className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8E2DA] rounded-xl text-sm text-[#1A1612] placeholder-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#C8974C] focus:border-[#C8974C]"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7E72]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (6+ characters)"
              required
              minLength={6}
              aria-label="Password"
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8E2DA] rounded-xl text-sm text-[#1A1612] placeholder-[#8A7E72] focus:outline-none focus:ring-2 focus:ring-[#C8974C] focus:border-[#C8974C]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1A1612] text-white rounded-xl text-sm font-semibold hover:bg-[#2d2520] active:bg-[#2d2520] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-[#8A7E72] text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#C8974C] font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
