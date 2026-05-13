export default function BottleLoading() {
  return (
    <div className="min-h-screen bg-white px-5 pt-14 pb-24">
      <div className="w-full aspect-[3/4] rounded-xl bg-[#F8F5F0] animate-pulse mb-6" />
      <div className="h-6 w-48 bg-[#F8F5F0] rounded animate-pulse mb-3" />
      <div className="h-4 w-32 bg-[#F8F5F0] rounded animate-pulse mb-6" />
      <div className="space-y-3">
        <div className="h-4 w-full bg-[#F8F5F0] rounded animate-pulse" />
        <div className="h-4 w-3/4 bg-[#F8F5F0] rounded animate-pulse" />
      </div>
    </div>
  )
}
