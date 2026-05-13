export default function ExploreLoading() {
  return (
    <div className="min-h-screen bg-white px-5 pt-14 pb-24">
      <div className="h-8 w-32 bg-[#F8F5F0] rounded animate-pulse mb-6" />
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-xl bg-[#F8F5F0] animate-pulse" />
        ))}
      </div>
    </div>
  )
}
