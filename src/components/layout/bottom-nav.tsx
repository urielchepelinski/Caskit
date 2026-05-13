import { Camera } from 'lucide-react'
import Link from 'next/link'

type NavItem = 'home' | 'explore' | 'scan' | 'shelf' | 'profile'

interface BottomNavProps {
  active: NavItem
}

const navItems: { id: NavItem; label: string; emoji: string; href: string }[] = [
  { id: 'home', label: 'Home', emoji: '🥃', href: '/' },
  { id: 'explore', label: 'Explore', emoji: '🧭', href: '/explore' },
  { id: 'scan', label: 'Scan', emoji: '', href: '/scan' },
  { id: 'shelf', label: 'My Shelf', emoji: '📚', href: '/shelf' },
  { id: 'profile', label: 'Profile', emoji: '👤', href: '/profile' },
]

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-[#E8E2DA] flex justify-around items-end px-0 pt-1.5 pb-5 z-50">
      {navItems.map((item) => {
        if (item.id === 'scan') {
          return (
            <Link key={item.id} href={item.href} className="flex flex-col items-center gap-0.5">
              <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center -mt-3.5 shadow-elevated">
                <Camera className="w-[22px] h-[22px] text-background" strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-semibold text-text-primary">Scan</span>
            </Link>
          )
        }

        const isActive = active === item.id

        return (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center gap-0.5 min-w-[50px]"
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                isActive ? 'bg-accent/20 ring-1 ring-accent' : 'bg-surface-light'
              }`}
            >
              <span className="text-[15px] leading-none">{item.emoji}</span>
            </div>
            <span className={`text-[10px] font-medium ${isActive ? 'text-accent' : 'text-text-muted'}`}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
