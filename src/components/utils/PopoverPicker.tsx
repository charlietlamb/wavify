import { HexColorPicker } from 'react-colorful'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface PopoverPickerProps {
  color: string
  onChange: (color: string) => void
  className?: string
}

export const PopoverPicker = ({
  color,
  onChange,
  className,
}: PopoverPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'picker flex min-h-10 min-w-10 justify-end rounded-md',
            className
          )}
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-full justify-center">
        <HexColorPicker color={color} onChange={onChange} />
      </PopoverContent>
    </Popover>
  )
}
