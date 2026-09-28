import { cn } from 'cn'

type NotificationPillProps = {
  count?: number
  text: string
  enabled?: boolean
  className?: string
}

/** "LIVE — 126 siswa sedang belajar sekarang" */
export function NotificationPill({ count, text, enabled = true, className }: NotificationPillProps) {
  if (!enabled) return null
  return (
    <div
      className={cn(
        'glass inline-flex items-center gap-2.5 rounded-full py-2 pr-4 pl-3 text-sm text-muted-foreground',
        className,
      )}
      role="status"
    >
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-blue-hover" />
        <span className="relative inline-flex size-2.5 rounded-full bg-blue" />
      </span>
      <span className="label-caps">Live</span>
      {typeof count === 'number' ? (
        <span className="font-semibold text-foreground">{count.toLocaleString('id-ID')}</span>
      ) : null}
      <span className="hidden sm:inline">{text}</span>
    </div>
  )
}
