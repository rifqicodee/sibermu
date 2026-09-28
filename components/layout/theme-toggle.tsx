'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'

type ThemeToggleProps = {
  dict: Dictionary
  className?: string
}

export function ThemeToggle({ dict, className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={dict.theme.toggle}
      title={isDark ? dict.theme.light : dict.theme.dark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-blue/8 hover:text-blue-hover',
        !mounted && 'opacity-0',
        className,
      )}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  )
}
