import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dispatch, ReactNode, SetStateAction } from 'react'

export default function FilesFilter({
  text,
  icon,
  on,
  setOn,
}: {
  text: string
  icon: ReactNode
  on: boolean
  setOn: Dispatch<SetStateAction<boolean>>
}) {
  return (
    <Button
      className={cn(
        'flex gap-x-1 rounded-none border-0 bg-black hover:bg-zinc-800 hover:text-zinc-200',
        on && 'border-zinc-200 bg-zinc-800 hover:bg-zinc-700 '
      )}
      onClick={() => setOn((prev) => !prev)}
      variant="zinc_outline"
    >
      {text}
      {icon}
    </Button>
  )
}
