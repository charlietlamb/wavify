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
        'flex gap-x-1 bg-black hover:bg-black hover:text-zinc-200',
        on && 'border-zinc-200  bg-black '
      )}
      onClick={() => setOn((prev) => !prev)}
      variant="zinc_outline"
    >
      {text}
      {icon}
    </Button>
  )
}
