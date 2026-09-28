'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

type AnimatedCounterProps = {
  value: number
  suffix?: string
  duration?: number
  className?: string
  /** format Indonesia: 15.000 */
  locale?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  duration = 1.8,
  className,
  locale = 'id-ID',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    let raf = 0
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          observer.disconnect()
          const start = performance.now()
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / (duration * 1000))
            const eased = 1 - Math.pow(1 - t, 3)
            setShown(Math.round(value * eased))
            if (t < 1) raf = requestAnimationFrame(step)
          }
          raf = requestAnimationFrame(step)
        }
      },
      { rootMargin: '-80px' },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduced, value, duration])

  const display = reduced ? value : shown

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString(locale)}
      {suffix}
    </span>
  )
}
