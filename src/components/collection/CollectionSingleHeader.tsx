import CollectionSingleButtons from './CollectionSingleButtons'
import CollectionSingleImage from './CollectionSingleImage'
import CollectionSingleToggle from './CollectionSingleToggle'
import { useCollectionContext } from './context/collectionContext'

export default function CollectionSingleHeader() {
  const { collection } = useCollectionContext()
  return (
    <div className="flex w-full gap-4 p-4">
      <CollectionSingleImage />
      <div className="max-h-[100px] w-full flex-grow overflow-y-auto">
        <div className="flex items-center gap-2">
          <CollectionSingleToggle />
          <h1 className="flex-grow overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl font-bold leading-none text-zinc-200">
            {collection.name}
          </h1>
          <CollectionSingleButtons />
        </div>
        <p className="text-zinc-400">{collection.description}</p>
      </div>
    </div>
  )
}
