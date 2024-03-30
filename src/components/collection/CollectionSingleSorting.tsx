import { savedSorting } from '../saved/data/savedSorting'
import { Button } from '../ui/button'
import { useCollectionContext } from './context/collectionContext'

export default function CollectionSingleSorting() {
  const { sorting, setSorting } = useCollectionContext()
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <h2 className="font-lg font-semibold">Sorting</h2>
      {savedSorting.map((sorting1) => (
        <Button
          key={sorting1}
          variant={sorting1 === sorting ? 'zinc' : 'zinc_outline'}
          onClick={() => setSorting(sorting1)}
        >
          {sorting1}
        </Button>
      ))}
    </div>
  )
}
