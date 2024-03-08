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
        'hover: flex gap-x-1 rounded-lg border border-input bg-transparent px-2 text-zinc-200 transition-all hover:rounded-md hover:bg-zinc-800',
        on && 'border-zinc-200 bg-zinc-200 text-zinc-800 hover:bg-zinc-300'
      )}
      onClick={() => setOn((prev) => !prev)}
    >
      {text}
      {icon}
    </Button>
  )
}
