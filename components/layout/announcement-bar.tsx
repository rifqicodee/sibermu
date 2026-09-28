'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Megaphone, X } from 'lucide-react'

import type { Dictionary } from '@/lib/i18n/messages'
import type { Locale } from '@/lib/i18n/config'
import { localise } from '@/lib/i18n'

type AnnouncementBarProps = {
  deadline?: string | null
  locale: Locale
  dict: Dictionary
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

export function AnnouncementBar({ deadline, locale, dict }: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const hasDeadline = Boolean(deadline)

  useEffect(() => {
    if (!deadline) return
    const target = new Date(deadline).getTime()
    if (Number.isNaN(target)) return
    const update = () => setTimeLeft(getTimeLeft(target))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [deadline])

  if (!visible) return null

  const dismiss = () => setVisible(false)

  const parts =
    timeLeft && hasDeadline
      ? [
          timeLeft.days ? `${timeLeft.days} ${dict.announcement.days}` : null,
          timeLeft.hours ? `${timeLeft.hours} ${dict.announcement.hours}` : null,
          timeLeft.minutes && timeLeft.days === 0 ? `${timeLeft.minutes} ${dict.announcement.minutes}` : null,
          timeLeft.days === 0 && timeLeft.hours === 0
            ? `${timeLeft.seconds} ${dict.announcement.seconds}`
            : null,
        ].filter(Boolean)
      : []

  return (
    <div className="relative bg-linear-to-r from-blue via-blue-hover to-blue">
      <div className="section flex h-10 items-center justify-center gap-2.5 px-10 text-center text-[0.8rem] text-white sm:gap-3 sm:text-[0.8125rem]">
        <Megaphone className="size-3.5 shrink-0" aria-hidden="true" />
        <span className="truncate font-medium">{dict.announcement.pmb}</span>
        {parts.length ? (
          <>
            <span className="hidden text-white/60 sm:inline">•</span>
            <span className="hidden shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 font-medium whitespace-nowrap sm:inline">
              {dict.announcement.countdownLabel} {parts.join(' ')}
            </span>
          </>
        ) : null}
        <Link
          href={localise('/pmb', locale)}
          className="hidden shrink-0 font-semibold underline underline-offset-2 transition-opacity hover:opacity-80 sm:inline"
        >
          {dict.common.daftarSekarang} →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label={dict.common.tutup}
          className="absolute right-2.5 grid size-6 place-items-center rounded-full transition-colors hover:bg-white/20"
        >
          <X className="size-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
