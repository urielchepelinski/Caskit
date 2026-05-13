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
      // Create account via API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Signup failed')
        setLoading(false)
        return
      }

      // Auto sign in after successful signup
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Account created but sign-in failed. Please log in.')
        setLoading(false)
        return
      }

      router.push('/')
    } catch {
      setError('Something went wrong. Please try again.')
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
              className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8E2DA] rounded-xl text-sm text-[#1A1612] placeholder-[#8A7E72] focus:outline-none focus:border-[#C8974C]"
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
              className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8E2DA] rounded-xl text-sm text-[#1A1612] placeholder-[#8A7E72] focus:outline-none focus:border-[#C8974C]"
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
              className="w-full pl-10 pr-4 py-3 bg-[#F8F5F0] border border-[#E8E2DA] rounded-xl text-sm text-[#1A1612] placeholder-[#8A7E72] focus:outline-none focus:border-[#C8974C]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#C8974C] text-white rounded-xl text-sm font-semibold hover:bg-[#A67B3D] active:bg-[#A67B3D] transition-colors disabled:opacity-50"
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
