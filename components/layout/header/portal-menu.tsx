'use client'

import Link from 'next/link'
import { ChevronsUpDown, GraduationCap, Presentation, Briefcase } from 'lucide-react'
import { DropdownMenu } from 'radix-ui'

import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'

type PortalMenuProps = {
  locale: Locale
  dict: Dictionary
  className?: string
}

const PORTALS = [
  { key: 'student', icon: GraduationCap },
  { key: 'lecturer', icon: Presentation },
  { key: 'staff', icon: Briefcase },
] as const

/** Dropdown Portal Login — Mahasiswa / Dosen / Staf, semuanya ke /akademik. */
export function PortalMenu({ locale, dict, className }: PortalMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={dict.portal.label}
          className={cn(
            'inline-flex h-8 items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--blue)_18%,transparent)] bg-white/60 px-3 text-xs font-bold text-blue transition-all hover:border-blue/30 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:bg-white/8',
            className,
          )}
        >
          {dict.portal.label}
          <ChevronsUpDown className="size-3 opacity-60" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className="z-[70] w-56 overflow-hidden rounded-2xl border border-[var(--header-border)] bg-[var(--header-glass)] p-1.5 shadow-[var(--header-shadow)] backdrop-blur-xl data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95"
        >
          <DropdownMenu.Label className="label-caps px-3 py-2">
            {dict.portal.label}
          </DropdownMenu.Label>
          {PORTALS.map(({ key, icon: Icon }) => (
            <DropdownMenu.Item key={key} asChild>
              <Link
                href={localise('/akademik', locale)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground outline-none transition-colors hover:bg-blue/10 focus:bg-blue/10"
              >
                <span className="grid size-7 place-items-center rounded-lg bg-blue/10 text-blue">
                  <Icon className="size-3.5" aria-hidden="true" />
                </span>
                {dict.portal[key]}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
