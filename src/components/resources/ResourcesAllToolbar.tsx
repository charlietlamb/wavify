import { cn } from '@/lib/utils'
import ResourcesAllTypes from './ResourcesAllTypes'
import MapHeading from '../util/MapHeading'
import { Bolt } from 'lucide-react'
import ResourcesAllSorting from './ResourcesAllSorting'

export default function ResourcesAllToolbar({
  mobile = false,
}: {
  mobile?: boolean
}) {
  return (
    <div
      className={cn(
        'hidden w-[20%] flex-col divide-y divide-zinc-700 lg:flex',
        mobile && 'flex w-full border-none'
      )}
    >
      <MapHeading
        title="Resources"
        text="Browse all resources"
        icon={
          <Bolt className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
        }
      />
      <div className="flex w-full flex-col gap-2 overflow-y-auto p-4 py-2">
        <ResourcesAllTypes />
        <ResourcesAllSorting />
      </div>
    </div>
  )
}
