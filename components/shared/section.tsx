import { cn } from 'cn'

type SectionProps = React.ComponentProps<'section'> & {
  id?: string
  /** vertikal padding, default py-24 sm:py-32 */
  spacing?: 'sm' | 'md' | 'lg' | 'none'
}

const spacingMap = {
  none: '',
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-24',
  lg: 'py-24 sm:py-32',
} as const

export function Section({ id, spacing = 'lg', className, ...props }: SectionProps) {
  return (
    <section id={id} className={cn('relative w-full', spacingMap[spacing], className)} {...props} />
  )
}
