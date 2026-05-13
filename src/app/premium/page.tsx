import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Crown, Sparkles, TrendingUp, Bell, BarChart3, Trophy, Ban } from 'lucide-react'
import { PremiumCTA } from '@/components/premium/premium-cta'

const FEATURES = [
  { icon: Sparkles, title: 'AI Sommelier', desc: 'Personalized picks based on your taste DNA' },
  { icon: TrendingUp, title: 'Price Intelligence', desc: 'Track prices, get drop alerts' },
  { icon: Crown, title: 'Cellar Manager', desc: 'Track value, optimal drinking windows' },
  { icon: Bell, title: 'Limited Release Alerts', desc: 'First to know about new drops' },
  { icon: BarChart3, title: 'Advanced Stats', desc: 'Palate evolution, taste DNA' },
  { icon: Trophy, title: 'Social Prestige', desc: 'Gold badge, premium leaderboards' },
  { icon: Ban, title: 'Ad-Free', desc: 'No promoted bottles or sponsored content' },
]

export default async function PremiumPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="px-5 pt-8 pb-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
          <Crown className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-2xl font-bold mb-2">The Connoisseur</h1>
        <p className="text-sm text-text-secondary">Unlock superpowers for the passionate whiskey lover</p>
      </div>

      <div className="px-5 mb-8">
        <div className="space-y-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3 p-3">
              <feature.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="text-xs text-text-secondary">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PremiumCTA />
    </div>
  )
}
