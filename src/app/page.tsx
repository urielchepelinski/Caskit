import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { DistillerySection } from '@/components/home/distillery-section'
import { TopBottlesSection } from '@/components/home/top-bottles-section'
import { LocalTrendingSection } from '@/components/home/local-trending-section'
import { getCountryFromHeaders } from '@/lib/geo'
import { auth } from '@/lib/auth'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

async function resolveCountry(): Promise<string | null> {
  try {
    const session = await auth()
    if (session?.user?.id) {
      const [user] = await db.select({ country: users.country })
        .from(users)
        .where(eq(users.id, session.user.id))
        .limit(1)
      if (user?.country) return user.country
    }
  } catch {
    // auth or DB failure — fall through to geo header
  }

  try {
    return await getCountryFromHeaders()
  } catch {
    return null
  }
}

function SectionSkeleton() {
  return (
    <div className="px-5 space-y-3 mb-7">
      <div className="h-5 w-36 rounded bg-surface animate-pulse" />
      <div className="h-20 rounded-xl bg-surface animate-pulse" />
      <div className="h-20 rounded-xl bg-surface animate-pulse" />
    </div>
  )
}

async function HomeContent() {
  const userCountry = await resolveCountry()

  return (
    <>
      <LocalTrendingSection country={userCountry} />
      <DistillerySection country={userCountry} />
      <TopBottlesSection />
    </>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <Suspense fallback={<SectionSkeleton />}>
        <HomeContent />
      </Suspense>
      <BottomNav active="home" />
    </div>
  )
}
