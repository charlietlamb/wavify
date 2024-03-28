import React from 'react'

import { cn } from '@/lib/utils'
import ToolbarHeading from './ToolbarHeading'

export default function Toolbar({
  title,
  text,
  icon,
  components,
  mobile = false,
}: {
  title: string
  text: string
  icon: React.ReactNode
  components: React.ReactNode[]
  mobile?: boolean
}) {
  return (
    <div
      className={cn(
        'hidden flex-col divide-y divide-zinc-700 lg:flex lg:w-[20%]',
        mobile && 'flex w-full'
      )}
    >
      <ToolbarHeading title={title} text={text} icon={icon} />
      <div className="flex w-full flex-col gap-2 overflow-y-auto p-4">
        {components.map((component, index) => {
          if (!React.isValidElement(component)) {
            return null
          }
          return React.cloneElement(component, { key: index })
        })}
      </div>
    </div>
  )
}
