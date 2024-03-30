import ToolbarHeading from '@/components/toolbar/ToolbarHeading'
import CollectionsCreateItems from './CollectionsCreateItems'
import CollectionsCreateSearch from './CollectionsCreateSearch'
import { Table } from 'lucide-react'
import CollectionsCreateSelected from './CollectionsCreateSelected'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'

export default function CollectionsCreateAdd() {
  const { selected } = useCollectionsCreateContext()
  return (
    <div className="flex max-h-full flex-col divide-y divide-zinc-700 overflow-hidden lg:w-[20%]">
      <ToolbarHeading
        title="Create"
        text="Add Collection Items"
        icon={
          <Table className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
        }
      />
      <div className="flex flex-grow flex-col divide-y divide-zinc-700 overflow-hidden">
        <CollectionsCreateSearch />
        <div className="relative flex max-h-none flex-grow flex-col divide-y divide-zinc-700 overflow-y-auto">
          {!!selected.length && <CollectionsCreateSelected />}
          <CollectionsCreateItems />
        </div>
      </div>
    </div>
  )
}
