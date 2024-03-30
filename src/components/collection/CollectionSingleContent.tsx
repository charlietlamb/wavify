import CollectionSingleHeader from './CollectionSingleHeader'
import CollectionSingleMap from './CollectionSingleMap'

export default function CollectionSingleContent() {
  return (
    <div className="flex w-full flex-col divide-y divide-zinc-700 lg:w-[80%]">
      <CollectionSingleHeader />
      <CollectionSingleMap />
    </div>
  )
}
