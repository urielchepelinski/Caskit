import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Caskit — Whiskey Discovery',
  description: 'Scan any whiskey bottle to discover its story, scores, and flavors.',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FFFFFF',
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-background text-text-primary antialiased">
        <Providers>
          <main className="mx-auto max-w-[430px] min-h-screen relative">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
