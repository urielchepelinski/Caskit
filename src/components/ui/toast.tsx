'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { Check, X, AlertCircle } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

let nextId = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = nextId++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-[90%] max-w-[380px] pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg text-sm font-medium pointer-events-auto animate-[slideUp_200ms_ease-out] ${
              t.type === 'success' ? 'bg-green-900 text-green-100' :
              t.type === 'error' ? 'bg-red-900 text-red-100' :
              'bg-text-primary text-background'
            }`}
          >
            {t.type === 'success' && <Check className="w-4 h-4 flex-shrink-0" />}
            {t.type === 'error' && <X className="w-4 h-4 flex-shrink-0" />}
            {t.type === 'info' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
