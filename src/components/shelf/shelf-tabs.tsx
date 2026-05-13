'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'

interface CollectionItem {
  collection: { id: number; status: string; addedAt: Date }
  expression: { id: number; name: string; slug: string; imageUrl: string | null; avgCommunityScore: number | null }
  bottle: { name: string; type: string; category: string }
  distillery: { name: string }
}

interface ShelfTabsProps {
  owned: CollectionItem[]
  wishlist: CollectionItem[]
  tasted: CollectionItem[]
}

type TabId = 'owned' | 'wishlist' | 'tasted'

export function ShelfTabs({ owned, wishlist, tasted }: ShelfTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('owned')

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: 'owned', label: 'Owned', count: owned.length },
    { id: 'wishlist', label: 'Wishlist', count: wishlist.length },
    { id: 'tasted', label: 'Tasted', count: tasted.length },
  ]

  const items = activeTab === 'owned' ? owned : activeTab === 'wishlist' ? wishlist : tasted

  return (
    <div>
      <div className="flex px-5 gap-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 text-center rounded-card text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-text-primary text-white'
                : 'bg-surface text-text-secondary border border-border'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="px-5">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-text-muted text-sm mb-3">
              {activeTab === 'owned' && "No bottles owned yet. Start scanning!"}
              {activeTab === 'wishlist' && "Your wishlist is empty. Explore bottles to add some!"}
              {activeTab === 'tasted' && "No tasting notes yet. Rate your first bottle!"}
            </p>
            <Link
              href={activeTab === 'owned' ? '/scan' : '/explore'}
              className="inline-block px-4 py-2 bg-accent text-white rounded-card text-sm font-medium"
            >
              {activeTab === 'owned' ? 'Scan a Bottle' : 'Explore Bottles'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((item) => (
              <Link
                key={item.collection.id}
                href={`/bottle/${item.expression.slug}`}
                className="bg-white rounded-card shadow-card border border-border overflow-hidden"
              >
                <div className="h-32 bg-surface flex items-center justify-center p-2">
                  {item.expression.imageUrl ? (
                    <img
                      src={item.expression.imageUrl}
                      alt={item.expression.name}
                      className="h-full w-auto object-contain"
                    />
                  ) : (
                    <div className="w-12 h-20 bg-border/50 rounded" />
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-semibold truncate">{item.expression.name}</h3>
                  <p className="text-[10px] text-text-muted truncate">{item.distillery.name}</p>
                  {item.expression.avgCommunityScore && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <Star className="w-3 h-3 fill-accent text-accent" />
                      <span className="text-[11px] font-semibold">
                        {(item.expression.avgCommunityScore / 20).toFixed(1)}
                      </span>
                    </div>
                  )}
                  <span className="inline-block mt-1.5 px-1.5 py-0.5 bg-surface text-[9px] font-medium text-text-muted rounded uppercase">
                    {item.bottle.type}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
