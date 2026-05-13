import { Search, Bell } from 'lucide-react'

export function Header() {
  return (
    <header className="flex justify-between items-center px-5 pt-4 pb-3">
      <h1 className="font-display text-2xl font-bold text-text-primary">
        Cas<span className="text-accent">kit</span>
      </h1>
      <div className="flex gap-3">
        <button className="w-[38px] h-[38px] rounded-full bg-surface border border-border flex items-center justify-center">
          <Search className="w-[18px] h-[18px] text-text-secondary" strokeWidth={1.5} />
        </button>
        <button className="w-[38px] h-[38px] rounded-full bg-surface border border-border flex items-center justify-center">
          <Bell className="w-[18px] h-[18px] text-text-secondary" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  )
}
