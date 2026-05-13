import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { BottomNav } from '@/components/layout/bottom-nav'
import { ArrowLeft, Bell, Info, Mail } from 'lucide-react'

export default async function SettingsPage() {
  let session
  try {
    session = await auth()
  } catch {
    redirect('/login')
  }

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] pb-20">
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <a href="/profile" className="p-2 -ml-2 rounded-lg hover:bg-[#F8F5F0]">
          <ArrowLeft className="w-5 h-5 text-[#1A1612]" />
        </a>
        <h1 className="text-lg font-bold text-[#1A1612]">Settings</h1>
      </div>

      <div className="px-5 space-y-6">
        {/* Account Section */}
        <section>
          <h2 className="text-xs font-semibold text-[#8A7E72] uppercase tracking-wider mb-3">Account</h2>
          <div className="bg-[#F8F5F0] rounded-xl border border-[#E8E2DA] p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#8A7E72]" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-[#8A7E72]">Email</div>
                <div className="text-sm font-medium text-[#1A1612] truncate">{session.user.email}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section>
          <h2 className="text-xs font-semibold text-[#8A7E72] uppercase tracking-wider mb-3">Notifications</h2>
          <div className="bg-[#F8F5F0] rounded-xl border border-[#E8E2DA] p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-[#8A7E72]" />
                <span className="text-sm font-medium text-[#1A1612]">Push Notifications</span>
              </div>
              <div className="w-10 h-6 bg-[#E8E2DA] rounded-full relative cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8A7E72]" />
                <span className="text-sm font-medium text-[#1A1612]">Email Updates</span>
              </div>
              <div className="w-10 h-6 bg-[#E8E2DA] rounded-full relative cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm" />
              </div>
            </div>
          </div>
          <p className="text-xs text-[#8A7E72] mt-2 px-1">Notification preferences coming soon.</p>
        </section>

        {/* About Section */}
        <section>
          <h2 className="text-xs font-semibold text-[#8A7E72] uppercase tracking-wider mb-3">About</h2>
          <div className="bg-[#F8F5F0] rounded-xl border border-[#E8E2DA] p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#8A7E72]" />
              <div className="flex-1">
                <div className="text-xs text-[#8A7E72]">App Version</div>
                <div className="text-sm font-medium text-[#1A1612]">Caskit v1.0.0</div>
              </div>
            </div>
            <div className="border-t border-[#E8E2DA] pt-3">
              <p className="text-xs text-[#8A7E72]">
                Scan any whiskey bottle to discover its story, scores, and flavors.
              </p>
            </div>
          </div>
        </section>
      </div>

      <BottomNav active="profile" />
    </div>
  )
}
