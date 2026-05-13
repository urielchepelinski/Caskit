interface FlavorBarProps {
  name: string
  value: number
  maxValue?: number
}

export function FlavorBar({ name, value, maxValue = 10 }: FlavorBarProps) {
  const percentage = (value / maxValue) * 100

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs text-text-secondary w-[70px] text-right">{name}</span>
      <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent-dark to-accent"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold text-accent w-6">{value}</span>
    </div>
  )
}
