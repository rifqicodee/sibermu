'use client'

import { useEffect, useRef, useState } from 'react'

type Options = {
  /** delay sebelum panel terbuka (hover-intent) */
  openDelay?: number
  /** delay sebelum panel tertutup */
  closeDelay?: number
}

/**
 * State mega menu desktop: hover-intent masuk/keluar, Escape untuk tutup,
 * dan penutupan otomatis saat route berubah.
 */
export function useMegaState({ openDelay = 60, closeDelay = 140 }: Options = {}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }

  useEffect(() => clear, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scheduleOpen = (id: string) => {
    clear()
    openTimer.current = setTimeout(() => setOpenId(id), openDelay)
  }

  const scheduleClose = () => {
    clear()
    closeTimer.current = setTimeout(() => setOpenId(null), closeDelay)
  }

  const cancelClose = () => clear()

  const close = () => {
    clear()
    setOpenId(null)
  }

  return { openId, setOpenId, scheduleOpen, scheduleClose, cancelClose, close }
}
