import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { MoreHorizontal } from 'lucide-react'

export default function WavifyCardEllipsis({
  ellipsisComponent,
}: {
  ellipsisComponent: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="zinc_icon"
          onClick={(e) => {
            e.stopPropagation()
            setOpen(true)
          }}
          className="absolute bottom-2 right-2 text-zinc-500 hover:text-zinc-200"
        >
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">{ellipsisComponent}</PopoverContent>
    </Popover>
  )
}
