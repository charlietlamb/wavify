import { sortingValues } from '../../dashboard/resources/manage/data/data'
import { Button } from '../../ui/button'
import { useResourcesContext } from './context/resourcesContext'

export default function ResourcesAllSorting() {
  const { sorting, setSorting } = useResourcesContext()
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <h2 className="font-lg font-semibold">Sorting</h2>
      {sortingValues.map((sorting1) => (
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
