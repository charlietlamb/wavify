import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function SeparatorH1({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <div className="flex w-full items-center gap-x-1">
      <Separator className="w-auto flex-grow bg-zinc-400" />
      <h1 className={cn('whitespace-nowrap text-zinc-200', className)}>
        {text}
      </h1>
      <Separator className="w-auto flex-grow bg-zinc-400" />
    </div>
  )
}
