import { ExternalLink, ShoppingBag } from 'lucide-react'

interface RetailerLink {
  retailer: string
  price: number
  currency: string
  url: string
  inStock: boolean
}

interface WhereToBuyProps {
  links: RetailerLink[]
}

export function WhereToBuy({ links }: WhereToBuyProps) {
  if (links.length === 0) return null

  const sorted = [...links].sort((a, b) => a.price - b.price)

  return (
    <div className="mb-6">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-3">
        Where to Buy
      </h3>
      <div className="space-y-2">
        {sorted.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-[#2A2420] rounded-xl border border-[rgba(200,151,76,0.1)]"
            onClick={() => trackAffiliateClick(link.retailer)}
          >
            <ShoppingBag className="w-5 h-5 text-[#A89B8C]" strokeWidth={1.5} />
            <div className="flex-1">
              <span className="text-sm font-medium text-[#F5F0EB]">{link.retailer}</span>
              {!link.inStock && (
                <span className="ml-2 text-[10px] text-red-400">Out of stock</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-accent">
                {link.currency === 'USD' ? '$' : link.currency}{link.price}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#6B5E52]" />
            </div>
          </a>
        ))}
      </div>
      <p className="text-[9px] text-[#6B5E52] mt-2 text-center">
        Prices may include affiliate links
      </p>
    </div>
  )
}

function trackAffiliateClick(retailer: string) {
  if (typeof window !== 'undefined' && window.posthog) {
    window.posthog.capture('affiliate_click', { retailer })
  }
}

declare global {
  interface Window {
    posthog?: { capture: (event: string, properties?: Record<string, unknown>) => void }
  }
}
