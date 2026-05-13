import { Home, Radio, BookOpen, User, Camera } from 'lucide-react'
import Link from 'next/link'

type NavItem = 'home' | 'explore' | 'scan' | 'shelf' | 'profile'

interface BottomNavProps {
  active: NavItem
}

const navItems: { id: NavItem; label: string; icon: typeof Home; href: string }[] = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'explore', label: 'Explore', icon: Radio, href: '/explore' },
  { id: 'scan', label: 'Scan', icon: Camera, href: '/scan' },
  { id: 'shelf', label: 'My Shelf', icon: BookOpen, href: '/shelf' },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
]

export function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-background border-t border-border flex justify-around items-end px-0 pt-1.5 pb-5 z-50">
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

        const Icon = item.icon
        const isActive = active === item.id

        return (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center gap-0.5 min-w-[50px]"
          >
            <Icon
              className={`w-6 h-6 ${isActive ? 'text-accent' : 'text-text-muted'}`}
              strokeWidth={1.5}
            />
            <span className={`text-[10px] font-medium ${isActive ? 'text-accent' : 'text-text-muted'}`}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
