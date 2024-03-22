'use client'

import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { CollectiveHeader } from './CollectiveHeader'
import CollectiveMemberMap from './CollectiveMemberMap'
import CollectiveSearchWrap from './CollectiveSearchWrap'
import CollectiveSpaces from './CollectiveSpaces'

export default function CollectiveSidebar() {
  return (
    <div
      className={cn(
        'flex h-full flex-grow flex-col bg-background_content py-1 text-primary'
      )}
    >
      <div className="flex gap-x-1 p-2">
        <CollectiveHeader />
        <CollectiveSearchWrap small={true} />
      </div>
      <Separator className="rounded-md bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex flex-grow flex-col overflow-auto px-3">
        <div className="flex h-full flex-grow flex-col overflow-y-auto">
          <CollectiveSpaces />
          <CollectiveMemberMap />
        </div>
      </div>
    </div>
  )
}
