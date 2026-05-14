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

export default async function HomePage() {
  // Resolve user's country: saved preference > Vercel geo header > fallback null
  let userCountry: string | null = null

  const session = await auth()
  if (session?.user?.id) {
    const [user] = await db.select({ country: users.country })
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1)
    if (user?.country) userCountry = user.country
  }

  if (!userCountry) {
    userCountry = await getCountryFromHeaders()
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <LocalTrendingSection country={userCountry} />
      <DistillerySection country={userCountry} />
      <TopBottlesSection />
      <BottomNav active="home" />
    </div>
  )
}
