import { cn } from 'cn'

type ContainerProps = React.ComponentProps<'div'>

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-7xl px-5 sm:px-8', className)} {...props} />
}
