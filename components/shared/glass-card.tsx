import { cn } from 'cn'

type GlassCardProps = React.ComponentProps<'div'> & {
  /** shadow blue glow */
  glow?: boolean
}

export function GlassCard({ className, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-card transition-all duration-300',
        glow && 'hover:shadow-blue-sm',
        className,
      )}
      {...props}
    />
  )
}
