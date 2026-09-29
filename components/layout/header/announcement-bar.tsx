'use client'

import { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { Megaphone, X } from 'lucide-react'

import { LanguageToggle } from '@/components/layout/language-toggle'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { PortalMenu } from '@/components/layout/header/portal-menu'
import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'

const DISMISS_KEY = 'sibermu:announcement:dismissed'

const dismissListeners = new Set<() => void>()

function subscribeDismissed(listener: () => void) {
  dismissListeners.add(listener)
  return () => {
    dismissListeners.delete(listener)
  }
}

function getDismissedSnapshot() {
  try {
    return window.sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

function getDismissedServerSnapshot() {
  return false
}

function persistDismissed() {
  try {
    window.sessionStorage.setItem(DISMISS_KEY, '1')
  } catch {
    /* sessionStorage bisa diblokir */
  }
  dismissListeners.forEach((listener) => listener())
}

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: number): TimeLeft | null {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  }
}

type AnnouncementBarProps = {
  deadline?: string | null
  locale: Locale
  dict: Dictionary
  /** baris utama sudah sticky? bar atas ikut menggulir dan tidak perlu sticky sendiri */
  className?: string
}

/** Layer 1 — top bar pengumuman (42px), meniru struktur sibermu.ac.id. */
export function AnnouncementBar({ deadline, locale, dict, className }: AnnouncementBarProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const dismissed = useSyncExternalStore(subscribeDismissed, getDismissedSnapshot, getDismissedServerSnapshot)

  useEffect(() => {
    if (!deadline) return
    const target = new Date(deadline).getTime()
    if (Number.isNaN(target)) return
    const update = () => setTimeLeft(getTimeLeft(target))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [deadline])

  if (dismissed) return null

  const dismiss = () => persistDismissed()

  const parts =
    timeLeft && deadline
      ? [
          timeLeft.days ? `${timeLeft.days} ${dict.announcement.days}` : null,
          timeLeft.hours ? `${timeLeft.hours} ${dict.announcement.hours}` : null,
          timeLeft.minutes && timeLeft.days === 0 ? `${timeLeft.minutes} ${dict.announcement.minutes}` : null,
          timeLeft.days === 0 && timeLeft.hours === 0
            ? `${timeLeft.seconds} ${dict.announcement.seconds}`
            : null,
        ].filter(Boolean)
      : []

  const messages = dict.announcement.messages

  return (
    <aside
      aria-label={dict.announcement.label}
      className={cn('header-topbar relative z-40', className)}
    >
      <div className="section flex h-[42px] items-center gap-3">
        {/* Kiri — megaphone + pengumuman berjalan */}
        <div className="marquee flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
          <Megaphone className="size-3.5 shrink-0 text-blue" aria-hidden="true" />
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <span className="sr-only">{dict.announcement.headline}</span>
            <div className="marquee-track flex w-max" aria-hidden="true">
              {[0, 1].map((copy) => (
                <ul key={copy} className="flex shrink-0 items-center gap-10 pr-10">
                  {messages.map((message) => (
                    <li
                      key={`${copy}-${message}`}
                      className="flex items-center gap-2.5 text-[0.78rem] font-semibold whitespace-nowrap"
                    >
                      {message}
                      <Link
                        href={localise('/pmb', locale)}
                        tabIndex={copy === 1 ? -1 : undefined}
                        className="rounded-full bg-blue px-2.5 py-0.5 text-[0.7rem] font-bold text-white transition-transform hover:scale-105"
                      >
                        {dict.announcement.cta} →
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* Tengah — tautan cepat */}
        <nav
          aria-label={dict.announcement.label}
          className="hidden items-center gap-4 text-[0.78rem] font-bold lg:flex"
        >
          <Link href={localise('/akademik#kalender', locale)} className="transition-opacity hover:opacity-70">
            {dict.announcement.calendar}
          </Link>
          <span aria-hidden="true" className="opacity-40">
            •
          </span>
          <Link href={localise('/pmb', locale)} className="transition-opacity hover:opacity-70">
            {dict.announcement.admissionInfo}
          </Link>
        </nav>

        {/* Kanan — countdown, portal, bahasa, tema */}
        <div className="flex shrink-0 items-center gap-2">
          {parts.length ? (
            <span className="hidden rounded-full bg-blue/10 px-2.5 py-1 text-[0.7rem] font-bold whitespace-nowrap text-blue sm:inline-flex">
              {dict.announcement.countdownLabel} {parts.join(' ')}
            </span>
          ) : null}

          <PortalMenu locale={locale} dict={dict} className="hidden sm:inline-flex" />
          <LanguageToggle locale={locale} dict={dict} className="hidden md:flex" />
          <ThemeToggle dict={dict} className="hidden md:grid" />

          <button
            type="button"
            onClick={dismiss}
            aria-label={dict.common.tutup}
            className="grid size-6 place-items-center rounded-full transition-colors hover:bg-blue/10"
          >
            <X className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  )
}
