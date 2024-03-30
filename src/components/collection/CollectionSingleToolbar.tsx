import ToolbarHeading from '@/components/toolbar/ToolbarHeading'
import { Table } from 'lucide-react'
import { useCollectionContext } from './context/collectionContext'
import CollectionSingleTypes from './CollectionSingleTypes'
import CollectionSingleSearch from './CollectionSingleSearch'
import CollectionSingleSorting from './CollectionSingleSorting'
import { cn } from '@/lib/utils'

export default function CollectionSingleToolbar({
  mobile = false,
}: {
  mobile?: boolean
}) {
  const { collection } = useCollectionContext()
  return (
    <div
      className={cn(
        'hidden max-h-full flex-col divide-y divide-zinc-700 overflow-hidden lg:flex lg:w-[20%]',
        mobile && 'flex w-full'
      )}
    >
      <ToolbarHeading
        title={collection.name}
        text="Collection"
        icon={
          <Table className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
        }
      />
      <div className="flex flex-grow flex-col divide-y divide-zinc-700 overflow-hidden">
        <CollectionSingleSearch />
        <CollectionSingleTypes />
        <CollectionSingleSorting />
      </div>
    </div>
  )
}
