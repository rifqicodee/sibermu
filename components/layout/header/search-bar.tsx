'use client'

import { Search } from 'lucide-react'

import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'

type SearchBarProps = {
  dict: Dictionary
  className?: string
}

const openSearch = () => window.dispatchEvent(new CustomEvent('sibermu:search:open'))

/**
 * Layer 4 — search bar di bawah nav (meniru sibermu.ac.id).
 * Tampilannya search bar, perilakunya membuka command palette global (⌘K).
 */
export function SearchBar({ dict, className }: SearchBarProps) {
  return (
    <div className={cn('relative z-40 border-b border-[var(--header-border)] bg-background/40', className)}>
      <div className="section py-3">
        <button
          type="button"
          onClick={openSearch}
          aria-label={dict.search.openLabel}
          className="group flex h-12 w-full items-center gap-3 rounded-[20px] border-2 border-blue/12 bg-white px-4 text-left shadow-none transition-all focus-within:border-blue focus-within:shadow-[0_0_0_4px_rgba(0,91,172,0.08)] hover:border-blue/30 dark:bg-white/6"
        >
          <Search className="size-4 shrink-0 text-blue" aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            {dict.search.barPlaceholder}
          </span>
          <kbd className="hidden rounded-md border border-blue/15 bg-blue/6 px-2 py-1 font-mono text-[0.65rem] font-semibold text-blue sm:inline-block">
            ⌘K
          </kbd>
          <span
            aria-hidden="true"
            className="grid h-9 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#005bac] to-[#2f80ed] px-4 text-xs font-bold text-white transition-transform group-hover:scale-[1.03]"
          >
            {dict.search.title}
          </span>
        </button>
      </div>
    </div>
  )
}
