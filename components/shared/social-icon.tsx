import { SOCIAL_PATHS } from '@/lib/social-paths'
import { cn } from 'cn'

type SocialIconProps = {
  platform: string
  className?: string
}

export function SocialIcon({ platform, className }: SocialIconProps) {
  const d = SOCIAL_PATHS[platform]
  if (!d) return null
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      className={cn('size-4', className)}
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  )
}
