import { auth, signOut } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { BottomNav } from '@/components/layout/bottom-nav'
import { LogOut, Settings, Crown } from 'lucide-react'

async function getProfileData(userId: string) {
  try {
    const { db } = await import('@/db')
    const { users, collections, reviews } = await import('@/db/schema')
    const { eq, count } = await import('drizzle-orm')

    const [collectionCount] = await db.select({ count: count() })
      .from(collections).where(eq(collections.userId, userId))
    const [reviewCount] = await db.select({ count: count() })
      .from(reviews).where(eq(reviews.userId, userId))
    const [user] = await db.select().from(users).where(eq(users.id, userId))

    return {
      collectionCount: collectionCount?.count ?? 0,
      reviewCount: reviewCount?.count ?? 0,
      subscriptionTier: user?.subscriptionTier ?? 'free',
    }
  } catch {
    return {
      collectionCount: 0,
      reviewCount: 0,
      subscriptionTier: 'free' as const,
    }
  }
}

export default async function ProfilePage() {
  let session
  try {
    session = await auth()
  } catch {
    redirect('/login')
  }

  if (!session?.user) {
    redirect('/login')
  }

  const userId = session.user.id ?? ''
  const { collectionCount, reviewCount, subscriptionTier } = await getProfileData(userId)

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-20">
      <div className="px-5 pt-8 pb-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#F8F5F0] border-2 border-[#E8E2DA] flex items-center justify-center mb-3 overflow-hidden">
          {session.user.image ? (
            <img src={session.user.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-[#8A7E72]">
              {session.user.name?.charAt(0) || '?'}
            </span>
          )}
        </div>
        <h1 className="text-lg font-bold text-[#1A1612]">{session.user.name || 'Whiskey Lover'}</h1>
        <p className="text-sm text-[#8A7E72]">{session.user.email}</p>
        {subscriptionTier === 'premium' && (
          <span className="mt-2 px-3 py-1 bg-[#C8974C]/10 text-[#C8974C] text-xs font-semibold rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3" /> Connoisseur
          </span>
        )}
      </div>

      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#F8F5F0] rounded-xl p-4 text-center border border-[#E8E2DA]">
          <div className="text-2xl font-bold text-[#C8974C]">{collectionCount}</div>
          <div className="text-xs text-[#8A7E72] mt-1">In Collection</div>
        </div>
        <div className="bg-[#F8F5F0] rounded-xl p-4 text-center border border-[#E8E2DA]">
          <div className="text-2xl font-bold text-[#C8974C]">{reviewCount}</div>
          <div className="text-xs text-[#8A7E72] mt-1">Reviews</div>
        </div>
      </div>

      <div className="px-5 space-y-2">
        {subscriptionTier !== 'premium' && (
          <a href="/premium" className="flex items-center gap-3 p-4 bg-[#C8974C]/5 rounded-xl border border-[#C8974C]/20">
            <Crown className="w-5 h-5 text-[#C8974C]" />
            <div className="flex-1">
              <span className="text-sm font-semibold text-[#1A1612]">Upgrade to Premium</span>
              <p className="text-xs text-[#8A7E72]">AI Sommelier, Price Tracking & more</p>
            </div>
          </a>
        )}
        <a href="/settings" className="flex items-center gap-3 p-4 bg-[#F8F5F0] rounded-xl border border-[#E8E2DA]">
          <Settings className="w-5 h-5 text-[#8A7E72]" />
          <span className="text-sm font-medium text-[#1A1612]">Settings</span>
        </a>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/login' })
          }}
        >
          <button className="w-full flex items-center gap-3 p-4 bg-[#F8F5F0] rounded-xl border border-[#E8E2DA]">
            <LogOut className="w-5 h-5 text-[#8A7E72]" />
            <span className="text-sm font-medium text-[#1A1612]">Sign Out</span>
          </button>
        </form>
      </div>

      <BottomNav active="profile" />
    </div>
  )
}
