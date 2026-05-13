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
    <div className="min-h-screen bg-[#1A1612] pb-20">
      <div className="px-5 pt-8 pb-6 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-[#2A2420] border-2 border-[#3A3430] flex items-center justify-center mb-3 overflow-hidden">
          {session.user.image ? (
            <img src={session.user.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl font-bold text-[#706050]">
              {session.user.name?.charAt(0) || '?'}
            </span>
          )}
        </div>
        <h1 className="text-lg font-bold text-[#F5F0EB]">{session.user.name || 'Whiskey Lover'}</h1>
        <p className="text-sm text-[#A09080]">{session.user.email}</p>
        {subscriptionTier === 'premium' && (
          <span className="mt-2 px-3 py-1 bg-[#C8974C]/10 text-[#C8974C] text-xs font-semibold rounded-full flex items-center gap-1">
            <Crown className="w-3 h-3" /> Connoisseur
          </span>
        )}
      </div>

      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[#2A2420] rounded-xl p-4 text-center border border-[#3A3430]">
          <div className="text-2xl font-bold text-[#C8974C]">{collectionCount}</div>
          <div className="text-xs text-[#A09080] mt-1">In Collection</div>
        </div>
        <div className="bg-[#2A2420] rounded-xl p-4 text-center border border-[#3A3430]">
          <div className="text-2xl font-bold text-[#C8974C]">{reviewCount}</div>
          <div className="text-xs text-[#A09080] mt-1">Reviews</div>
        </div>
      </div>

      <div className="px-5 space-y-2">
        {subscriptionTier !== 'premium' && (
          <a href="/premium" className="flex items-center gap-3 p-4 bg-[#C8974C]/5 rounded-xl border border-[#C8974C]/20">
            <Crown className="w-5 h-5 text-[#C8974C]" />
            <div className="flex-1">
              <span className="text-sm font-semibold text-[#F5F0EB]">Upgrade to Premium</span>
              <p className="text-xs text-[#A09080]">AI Sommelier, Price Tracking & more</p>
            </div>
          </a>
        )}
        <a href="/settings" className="flex items-center gap-3 p-4 bg-[#2A2420] rounded-xl border border-[#3A3430]">
          <Settings className="w-5 h-5 text-[#A09080]" />
          <span className="text-sm font-medium text-[#F5F0EB]">Settings</span>
        </a>
        <form
          action={async () => {
            'use server'
            await signOut({ redirectTo: '/login' })
          }}
        >
          <button className="w-full flex items-center gap-3 p-4 bg-[#2A2420] rounded-xl border border-[#3A3430]">
            <LogOut className="w-5 h-5 text-[#A09080]" />
            <span className="text-sm font-medium text-[#F5F0EB]">Sign Out</span>
          </button>
        </form>
      </div>

      <BottomNav active="profile" />
    </div>
  )
}
