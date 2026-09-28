'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/lib/use-reduced-motion'

/** Glow lembut yang mengikuti kursor — desktop & tanpa reduced-motion saja. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return

    let raf = 0
    let running = false
    let targetX = -600
    let targetY = -600
    let currentX = -600
    let currentY = -600

    const tick = () => {
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14
      el.style.transform = `translate3d(${currentX - 250}px, ${currentY - 250}px, 0)`
      const settled =
        Math.abs(targetX - currentX) < 0.4 && Math.abs(targetY - currentY) < 0.4
      if (settled) {
        running = false
        return
      }
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (el.style.opacity !== '0.4') el.style.opacity = '0.4'
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 hidden size-[500px] rounded-full opacity-0 mix-blend-plus-lighter transition-opacity duration-500 lg:block"
      style={{
        transform: 'translate3d(-600px, -600px, 0)',
        background:
          'radial-gradient(circle, rgba(0,91,172,0.16) 0%, rgba(0,91,172,0.06) 40%, transparent 70%)',
      }}
    />
  )
}
