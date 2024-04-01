import { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'

export default function Sorting({
  sorting,
  setSorting,
  values,
}: {
  sorting: string
  setSorting: Dispatch<SetStateAction<string>>
  values: string[]
}) {
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <h2 className="font-lg font-semibold">Sorting</h2>
      {values.map((sorting1) => (
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
