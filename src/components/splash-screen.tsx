'use client'

import { useState, useEffect } from 'react'

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2500)
    const remove = setTimeout(() => setVisible(false), 2900)
    return () => { clearTimeout(timer); clearTimeout(remove) }
  }, [])

  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>('img[data-preload]')
    images.forEach(img => {
      if (img.dataset.preload) {
        const preload = new Image()
        preload.src = img.dataset.preload
      }
    })
  }, [])

  if (!visible) return <>{children}</>

  return (
    <>
      <div className="opacity-0 absolute inset-0 pointer-events-none overflow-hidden">
        {children}
      </div>

      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1A1612] transition-opacity duration-[400ms] overflow-hidden ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Floating particles */}
        {[20, 40, 60, 80, 35, 65].map((left, i) => (
          <div
            key={i}
            className="absolute w-[3px] h-[3px] rounded-full bg-[rgba(200,151,76,0.4)] animate-[float-up_3s_ease-in_infinite]"
            style={{ left: `${left}%`, animationDelay: `${i * 0.3}s` }}
          />
        ))}

        {/* Ambient glow */}
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(200,151,76,0.15)_0%,transparent_70%)] animate-[glow-breathe_3s_ease-in-out_infinite]" />

        {/* Logo with spinning ring */}
        <div className="relative z-10 animate-[logo-enter_0.6s_cubic-bezier(0.34,1.56,0.64,1)_0.2s_both]">
          <div className="absolute -inset-[6px] rounded-full border border-transparent border-t-[rgba(200,151,76,0.6)] animate-[spin_2s_linear_infinite]" />
          <div className="w-[88px] h-[88px] rounded-full bg-[rgba(200,151,76,0.15)] border border-[rgba(200,151,76,0.3)] shadow-[0_0_40px_rgba(200,151,76,0.2)] flex items-center justify-center">
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 4C14 4 12 8 12 12V16C12 16 8 18 8 24C8 30 12 36 20 36C28 36 32 30 32 24C32 18 28 16 28 16V12C28 8 26 4 20 4Z"
                stroke="#C8974C"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M15 20C15 20 17 22 20 22C23 22 25 20 25 20"
                stroke="#C8974C"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="20" cy="28" r="2" fill="#C8974C" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Brand text */}
        <div className="relative z-10 text-center mt-7">
          <h1 className="text-4xl font-display font-bold text-white tracking-tight mb-2 animate-[text-up_0.5s_ease-out_0.6s_both]">
            Caskit
          </h1>
          <p className="text-sm text-white/45 font-light tracking-wide animate-[text-up_0.5s_ease-out_0.9s_both]">
            Your whiskey companion
          </p>
        </div>

        {/* Pour loading bar */}
        <div className="relative z-10 mt-12 w-[120px] h-[2px] bg-white/[0.08] rounded-full overflow-hidden animate-[text-up_0.4s_ease-out_1.2s_both]">
          <div className="h-full w-0 bg-gradient-to-r from-[#A67B3D] via-[#C8974C] to-[#D4A85E] rounded-full animate-[pour_1.8s_ease-in-out_1.3s_forwards]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float-up {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
        @keyframes glow-breathe {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        @keyframes logo-enter {
          from { opacity: 0; transform: scale(0.6); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes text-up {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pour {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </>
  )
}
