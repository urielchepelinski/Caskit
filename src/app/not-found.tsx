import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-16 h-16 mb-4 rounded-full bg-[#F8F5F0] flex items-center justify-center">
        <span className="text-2xl">🥃</span>
      </div>
      <h1 className="font-display text-xl font-bold text-[#1A1612] mb-2">Page Not Found</h1>
      <p className="text-sm text-[#8A7E72] text-center mb-6">
        This bottle seems to have gone missing from our collection.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#C8974C] text-white rounded-xl text-sm font-semibold"
      >
        Back to Home
      </Link>
    </div>
  )
}
