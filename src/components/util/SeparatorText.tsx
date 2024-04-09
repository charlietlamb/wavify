import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function SeparatorText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  return (
    <div className="flex w-full items-center gap-x-1">
      <Separator className="w-auto flex-grow bg-zinc-400" />
      <p className={cn('whitespace-nowrap text-zinc-400', className)}>{text}</p>
      <Separator className="w-auto flex-grow bg-zinc-400" />
    </div>
  )
}
