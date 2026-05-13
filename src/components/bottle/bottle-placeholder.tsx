export function BottlePlaceholder({ className = 'w-10 h-20' }: { className?: string }) {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg viewBox="0 0 40 80" fill="none" className="w-full h-full opacity-40">
        <rect x="14" y="0" width="12" height="8" rx="2" fill="#C8974C" />
        <rect x="16" y="8" width="8" height="6" fill="#C8974C" />
        <path d="M16 14 C16 14, 10 20, 10 28 L10 72 C10 76, 12 78, 16 78 L24 78 C28 78, 30 76, 30 72 L30 28 C30 20, 24 14, 24 14 Z" fill="#C8974C" />
        <rect x="12" y="35" width="16" height="20" rx="1" fill="#F8F5F0" opacity="0.6" />
      </svg>
    </div>
  )
}
