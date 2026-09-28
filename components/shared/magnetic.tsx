'use client'

import { useEffect, useRef } from 'react'
import { cn } from 'cn'

type MagneticProps = {
  children: React.ReactNode
  className?: string
  /** seberapa kuat tarikan (0-1) */
  strength?: number
}

/** Membuat konten anak "tertarik" ke arah kursor. Desktop saja. */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let running = false
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0

    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = x || y ? `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)` : ''
      if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
        running = false
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      tx = (e.clientX - (rect.left + rect.width / 2)) * strength
      ty = (e.clientY - (rect.top + rect.height / 2)) * strength
      start()
    }

    const onMouseLeave = () => {
      tx = 0
      ty = 0
      start()
    }

    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
    return () => {
      el.removeEventListener('mousemove', onMouseMove)
      el.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(raf)
    }
  }, [strength])

  return (
    <div ref={ref} className={cn('inline-block', className)}>
      {children}
    </div>
  )
}
