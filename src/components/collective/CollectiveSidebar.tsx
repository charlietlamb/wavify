'use client'

import { cn } from '@/lib/utils'
import { Separator } from '../ui/separator'
import { CollectiveHeader } from './CollectiveHeader'
import CollectiveMemberMap from './CollectiveMemberMap'
import CollectiveSearchWrap from './CollectiveSearchWrap'
import CollectiveSpaces from './CollectiveSpaces'

export default function CollectiveSidebar({
  mobile = false,
}: {
  mobile?: boolean
}) {
  return (
    <div
      className={cn(
        'hidden h-full flex-grow flex-col bg-background_content text-primary md:flex',
        mobile && 'flex'
      )}
    >
      <div className="flex divide-x divide-zinc-700">
        <CollectiveHeader />
        <CollectiveSearchWrap small={true} />
      </div>
      <Separator className="rounded-md bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex flex-grow flex-col overflow-auto">
        <div className="flex h-full flex-grow flex-col divide-y divide-zinc-700 overflow-y-auto">
          <CollectiveSpaces />
          <CollectiveMemberMap />
        </div>
      </div>
    </div>
  )
}
