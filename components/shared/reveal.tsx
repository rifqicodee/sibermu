'use client'

import { useEffect, useRef } from 'react'
import { cn } from 'cn'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** offset Y awal dalam px */
  y?: number
  delay?: number
  /** stagger per anak — untuk list/card */
  stagger?: boolean
  duration?: number
}

/**
 * Scroll-reveal berbasis IntersectionObserver + CSS.
 * Konten default terlihat; hanya di-hidden lewat JS bila elemen masih
 * di luar viewport saat mount (aman tanpa JS & prefers-reduced-motion).
 */
export function Reveal({ children, className, y = 32, delay = 0, stagger = false, duration = 0.9 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92) {
      // sudah terlihat — tidak perlu di-hidden (hindari flash)
      return
    }

    el.style.setProperty('--reveal-y', `${y}px`)
    el.style.setProperty('--reveal-duration', `${duration}s`)
    el.style.setProperty('--reveal-delay', `${delay}s`)
    el.classList.add('reveal-armed')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [y, delay, duration])

  return (
    <div ref={ref} className={cn(className, stagger && 'reveal-stagger')}>
      {children}
    </div>
  )
}
