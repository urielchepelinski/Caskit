import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { BottomNav } from '@/components/layout/bottom-nav'
import { DistillerySection } from '@/components/home/distillery-section'
import { TopBottlesSection } from '@/components/home/top-bottles-section'

function SectionSkeleton() {
  return (
    <div className="px-5 mb-7 animate-pulse">
      <div className="h-5 w-32 bg-surface rounded mb-3" />
      <div className="space-y-2.5">
        <div className="h-20 bg-surface rounded-xl" />
        <div className="h-20 bg-surface rounded-xl" />
        <div className="h-20 bg-surface rounded-xl" />
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      <Suspense fallback={<SectionSkeleton />}>
        <DistillerySection />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <TopBottlesSection />
      </Suspense>
      <BottomNav active="home" />
    </div>
  )
}
