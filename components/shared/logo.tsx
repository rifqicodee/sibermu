import { cn } from 'cn'

type LogoMarkProps = {
  className?: string
  /** tampilkan wordmark di samping mark */
  withWordmark?: boolean
  wordmarkClassName?: string
}

export function LogoMark({ className, withWordmark = false, wordmarkClassName }: LogoMarkProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="size-9 shrink-0"
      >
        <circle cx="20" cy="20" r="19" stroke="url(#markStroke)" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="13.5" stroke="url(#markStroke)" strokeWidth="1" opacity="0.5" />
        <path
          d="M20 7.5 L23.4 16.6 L32.5 20 L23.4 23.4 L20 32.5 L16.6 23.4 L7.5 20 L16.6 16.6 Z"
          fill="url(#markFill)"
        />
        <circle cx="20" cy="20" r="3" fill="#0A0A0A" />
        <defs>
          <linearGradient id="markStroke" x1="4" y1="4" x2="36" y2="36">
            <stop stopColor="#E8D5B7" />
            <stop offset="1" stopColor="#A78B71" />
          </linearGradient>
          <linearGradient id="markFill" x1="8" y1="8" x2="32" y2="32">
            <stop stopColor="#E8D5B7" />
            <stop offset="0.55" stopColor="#A78B71" />
            <stop offset="1" stopColor="#C9B8A0" />
          </linearGradient>
        </defs>
      </svg>
      {withWordmark ? (
        <span
          className={cn(
            'flex flex-col leading-none',
            wordmarkClassName,
          )}
        >
          <span className="font-display text-base tracking-tight">Muhammadiyah</span>
          <span className="text-[0.6rem] font-medium tracking-label text-blue uppercase">
            Digital Education
          </span>
        </span>
      ) : null}
    </span>
  )
}
