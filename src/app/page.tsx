import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { DistillerySection } from '@/components/home/distillery-section'
import { TopBottlesSection } from '@/components/home/top-bottles-section'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <DistillerySection />
      <TopBottlesSection />
      <BottomNav active="home" />
    </div>
  )
}
