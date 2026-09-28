/** Riwayat pencarian — disimpan di localStorage, dibaca via useSyncExternalStore. */

const KEY = 'sibermu:search:recent'
const MAX = 6

const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((listener) => listener())
}

export function subscribeRecent(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Snapshot berbentuk string agar referensinya stabil antar-render. */
export function getRecentSnapshot(): string {
  try {
    return window.localStorage.getItem(KEY) ?? ''
  } catch {
    return ''
  }
}

export function getRecentServerSnapshot(): string {
  return ''
}

export function parseRecent(raw: string): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((entry): entry is string => typeof entry === 'string') : []
  } catch {
    return []
  }
}

export function addRecent(term: string) {
  const value = term.trim()
  if (value.length < 2) return
  const next = [value, ...parseRecent(getRecentSnapshot()).filter((entry) => entry !== value)].slice(0, MAX)
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {
    /* storage bisa diblokir */
  }
  emit()
}

export function clearRecent() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* abaikan */
  }
  emit()
}
