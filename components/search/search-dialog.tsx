'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { CornerDownLeft, FileText, Loader2, Search } from 'lucide-react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'

type SearchType = 'fakultas' | 'prodi' | 'dosen' | 'berita' | 'event' | 'faq' | 'page'

type SearchItem = {
  type: SearchType
  title: string
  excerpt?: string | null
  meta?: string | null
  href: string
}

const GROUP_ORDER: SearchType[] = ['fakultas', 'prodi', 'dosen', 'berita', 'event', 'faq', 'page']

const GROUP_ICON: Record<SearchType, typeof FileText> = {
  fakultas: FileText,
  prodi: FileText,
  dosen: FileText,
  berita: FileText,
  event: FileText,
  faq: FileText,
  page: FileText,
}

type SearchDialogProps = {
  locale: Locale
  dict: Dictionary
}

export function SearchDialog({ locale, dict }: SearchDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [items, setItems] = useState<SearchItem[] | null>(null)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('sibermu:search:open', onOpen)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('sibermu:search:open', onOpen)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    if (open && items === null) {
      fetch('/api/search')
        .then((res) => res.json())
        .then((data: { items?: SearchItem[] }) => setItems(data.items ?? []))
        .catch(() => setItems([]))
    }
  }, [open, items])

  const fuse = useMemo(
    () =>
      items
        ? new Fuse(items, {
            keys: ['title', 'excerpt', 'meta'],
            threshold: 0.35,
            ignoreLocation: true,
            minMatchCharLength: 2,
          })
        : null,
    [items],
  )

  const results = useMemo(() => {
    if (!items) return []
    const trimmed = query.trim()
    const base = trimmed.length >= 2 && fuse ? fuse.search(trimmed).map((r) => r.item) : items
    const pages = base.filter((i) => i.type === 'page')
    const rest = base.filter((i) => i.type !== 'page')
    const ordered = trimmed.length >= 2 && fuse ? [...rest, ...pages] : pages
    return [...ordered].sort((a, b) => GROUP_ORDER.indexOf(a.type) - GROUP_ORDER.indexOf(b.type)).slice(0, 16)
  }, [fuse, items, query])

  const go = useCallback(
    (item: SearchItem) => {
      setOpen(false)
      setQuery('')
      setActive(0)
      router.push(localise(item.href, locale))
    },
    [locale, router],
  )

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (event.key === 'Enter' && results[active]) {
      event.preventDefault()
      go(results[active])
    }
  }

  const groups = useMemo(() => {
    const map = new Map<SearchType, { item: SearchItem; index: number }[]>()
    results.forEach((item, index) => {
      const list = map.get(item.type) ?? []
      list.push({ item, index })
      map.set(item.type, list)
    })
    return GROUP_ORDER.filter((type) => map.has(type)).map((type) => ({
      type,
      entries: map.get(type)!,
    }))
  }, [results])

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
        if (!value) {
          setQuery('')
          setActive(0)
        }
      }}
    >
      <DialogContent
        aria-describedby={undefined}
        className="top-[12vh] max-w-xl translate-y-0 gap-0 overflow-hidden border border-white/10 bg-popover p-0 shadow-2xl shadow-black/20"
      >
        <DialogTitle className="sr-only">{dict.search.title}</DialogTitle>

        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKeyDown}
            placeholder={dict.search.placeholder}
            aria-label={dict.search.title}
            autoFocus
            className="h-13 w-full bg-transparent py-4 text-base outline-none placeholder:text-muted-foreground"
          />
          {items === null ? <Loader2 className="size-4 animate-spin text-muted-foreground" /> : null}
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {groups.length === 0 && items !== null ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              {dict.search.empty} “{query}”
            </p>
          ) : null}

          {groups.map((group) => {
            const Icon = GROUP_ICON[group.type]
            return (
              <div key={group.type} className="mb-1.5 last:mb-0">
                <p className="label-caps px-3 pt-2 pb-1">{dict.search.group[group.type]}</p>
                {group.entries.map(({ item, index }) => (
                  <button
                    key={`${item.type}-${item.title}-${index}`}
                    type="button"
                    onClick={() => go(item)}
                    onMouseEnter={() => setActive(index)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      index === active ? 'bg-blue/10' : 'hover:bg-blue/6',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg',
                        index === active ? 'bg-blue text-white' : 'bg-blue/10 text-blue',
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="truncate text-sm font-medium text-foreground">{item.title}</span>
                        {item.meta ? (
                          <span className="shrink-0 text-[0.7rem] text-muted-foreground">{item.meta}</span>
                        ) : null}
                      </span>
                      {item.excerpt ? (
                        <span className="mt-0.5 line-clamp-1 block text-xs text-muted-foreground">
                          {item.excerpt}
                        </span>
                      ) : null}
                    </span>
                    {index === active ? (
                      <CornerDownLeft className="mt-1 size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                    ) : null}
                  </button>
                ))}
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between border-t border-border bg-muted/40 px-4 py-2 text-[0.7rem] text-muted-foreground">
          <span>{dict.search.hint}</span>
          <span className="hidden sm:inline">⌘K</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
