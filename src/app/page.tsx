import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { DistillerySection } from '@/components/home/distillery-section'
import { TopBottlesSection } from '@/components/home/top-bottles-section'

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="pb-20">
        <DistillerySection />
        <TopBottlesSection />
      </div>
      <BottomNav active="home" />
    </>
  )
}
