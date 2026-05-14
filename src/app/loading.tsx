export default function Loading() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header skeleton */}
      <header className="flex justify-between items-center px-5 pt-4 pb-3">
        <div className="h-7 w-20 rounded bg-surface animate-pulse" />
        <div className="w-11 h-11 rounded-full bg-surface animate-pulse" />
      </header>

      {/* Content skeleton */}
      <div className="px-5 mt-4 space-y-6">
        <div className="h-5 w-40 rounded bg-surface animate-pulse" />
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3].map(i => (
            <div key={i} className="min-w-[200px] h-32 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>

        <div className="h-5 w-32 rounded bg-surface animate-pulse mt-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-20 rounded-xl bg-surface animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
