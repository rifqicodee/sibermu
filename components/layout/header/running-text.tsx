'use client'

import { useState } from 'react'

import { cn } from 'cn'
import type { Dictionary } from '@/lib/i18n/messages'

const IFRAME_SRC = 'https://kaldik.sibermu.ac.id/embed-running-text.php'

type RunningTextProps = {
  dict: Dictionary
  className?: string
}

/** Layer 3 — running text dari kaldik.sibermu.ac.id (fallback: marquee lokal). */
export function RunningText({ dict, className }: RunningTextProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={cn(
        'relative z-40 h-[45px] w-full overflow-hidden border-b border-[var(--header-border)] bg-background/60',
        className,
      )}
    >
      {failed ? (
        <div className="marquee flex h-full items-center overflow-hidden">
          <div className="marquee-track flex w-max">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center gap-10 pr-10 text-sm font-medium whitespace-nowrap text-muted-foreground"
              >
                {dict.runningText.fallback}
                <span className="text-blue">•</span>
                {dict.announcement.headline}
                <span className="text-blue">•</span>
              </p>
            ))}
          </div>
        </div>
      ) : (
        <iframe
          src={IFRAME_SRC}
          title={dict.runningText.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full border-0 dark:invert dark:hue-rotate-180"
        />
      )}
      <span className="sr-only">{dict.runningText.title}</span>
    </div>
  )
}
