import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function SeparatorH1({
  text,
  className,
  divClassName,
  overlay,
}: {
  text: string
  className?: string
  divClassName?: string
  overlay?: boolean
}) {
  return (
    <div
      className={cn('relative flex w-full items-center gap-x-1', divClassName)}
    >
      {overlay && <div className="absolute inset-0 bg-black opacity-50" />}
      <Separator className="relative z-10 w-auto flex-grow bg-zinc-400" />
      <h1
        className={cn(
          'relative z-10 whitespace-nowrap text-zinc-200',
          className
        )}
      >
        {text}
      </h1>
      <Separator className="relative z-10 w-auto flex-grow bg-zinc-400" />
    </div>
  )
}
