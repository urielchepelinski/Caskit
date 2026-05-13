import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { BottomNav } from '@/components/layout/bottom-nav'
import { db } from '@/db'
import { users, collections, reviews } from '@/db/schema'
import { eq, count } from 'drizzle-orm'
import { LogOut, Settings, Crown } from 'lucide-react'

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const userId = session.user.id!

  const [collectionCount] = await db.select({ count: count() })
    .from(collections).where(eq(collections.userId, userId))
  const [reviewCount] = await db.select({ count: count() })
    .from(reviews).where(eq(reviews.userId, userId))

  const [user] = await db.select().from(users).where(eq(users.id, userId))

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-5 pt-8 pb-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-surface border-2 border-border flex items-center justify-center mb-3 overflow-hidden">
          {session.user.image ? (
            <img src={session.user.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-text-muted">
              {session.user.name?.charAt(0) || '?'}
            </span>
          )}
        </div>
        <h1 className="text-lg font-bold">{session.user.name || 'Whiskey Lover'}</h1>
        <p className="text-sm text-text-secondary">{session.user.email}</p>
        {user?.subscriptionTier === 'premium' && (
          <span className="mt-2 px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3" /> Connoisseur
          </span>
        )}
      </div>

      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface rounded-card p-4 text-center border border-border">
          <div className="text-2xl font-bold text-accent">{collectionCount.count}</div>
          <div className="text-xs text-text-secondary mt-1">In Collection</div>
        </div>
        <div className="bg-surface rounded-card p-4 text-center border border-border">
          <div className="text-2xl font-bold text-accent">{reviewCount.count}</div>
          <div className="text-xs text-text-secondary mt-1">Reviews</div>
        </div>
      </div>

      <div className="px-5 space-y-2">
        {user?.subscriptionTier !== 'premium' && (
          <a href="/premium" className="flex items-center gap-3 p-4 bg-accent/5 rounded-card border border-accent/20">
            <Crown className="w-5 h-5 text-accent" />
            <div className="flex-1">
              <span className="text-sm font-semibold">Upgrade to Premium</span>
              <p className="text-xs text-text-secondary">AI Sommelier, Price Tracking & more</p>
            </div>
          </a>
        )}
        <a href="/settings" className="flex items-center gap-3 p-4 bg-surface rounded-card border border-border">
          <Settings className="w-5 h-5 text-text-secondary" />
          <span className="text-sm font-medium">Settings</span>
        </a>
        <form action="/api/auth/signout" method="POST">
          <button className="w-full flex items-center gap-3 p-4 bg-surface rounded-card border border-border">
            <LogOut className="w-5 h-5 text-text-secondary" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </form>
      </div>

      <BottomNav active="profile" />
    </div>
  )
}
