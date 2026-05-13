export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-[#E8E2DA] border-t-[#C8974C] animate-spin" />
        <span className="text-sm text-[#8A7E72]">Loading...</span>
      </div>
    </div>
  )
}
