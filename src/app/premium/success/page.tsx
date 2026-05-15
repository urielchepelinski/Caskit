import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Crown, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default async function PremiumSuccessPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-5">
      <div className="text-center max-w-sm">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to The Connoisseur!</h1>
        <p className="text-sm text-text-secondary mb-8">
          Your premium subscription is now active. Enjoy all the exclusive features.
        </p>
        <div className="space-y-3">
          <Link
            href="/explore"
            className="block w-full py-3 bg-accent text-white rounded-card text-sm font-bold text-center"
          >
            Start Exploring
          </Link>
          <Link
            href="/profile"
            className="block w-full py-3 border border-border text-text-primary rounded-card text-sm font-medium text-center"
          >
            View Profile
          </Link>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-accent">
          <Crown className="w-4 h-4" />
          <span className="text-xs font-medium">Premium Active</span>
        </div>
      </div>
    </div>
  )
}
