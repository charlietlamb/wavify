import CollectionsCreateItem from './CollectionsCreateItem'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'

export default function CollectionsCreateSelected() {
  const { selected } = useCollectionsCreateContext()
  return (
    <div className="flex flex-shrink-0 flex-col divide-y divide-zinc-700 overflow-hidden overflow-y-auto overflow-ellipsis">
      <h3 className="p-2 font-semibold">Selected</h3>
      <div className="flex flex-col gap-4 p-2">
        {!!selected.length &&
          selected.map((item: Item) => (
            <CollectionsCreateItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  )
}
