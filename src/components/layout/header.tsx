import { Search, Bell } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <header className="flex justify-between items-center px-5 pt-4 pb-3 bg-background">
      <Link href="/">
        <h1 className="font-display text-2xl font-bold text-text-primary">
          Cas<span className="text-accent">kit</span>
        </h1>
      </Link>
      <div className="flex gap-3">
        <button className="w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center">
          <Search className="w-[18px] h-[18px] text-text-muted" strokeWidth={1.5} />
        </button>
        <button className="w-11 h-11 rounded-full bg-surface border border-border flex items-center justify-center">
          <Bell className="w-[18px] h-[18px] text-text-muted" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
