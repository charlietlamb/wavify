import { Button } from '../ui/button'
import { useSavedContext } from './context/savedContext'
import { wavifyTypes } from './data/wavifyTypes'

export default function SavedTypes() {
  const { type, setType } = useSavedContext()
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <h2 className="font-lg font-semibold">Types</h2>
      {wavifyTypes.map((type1) => (
        <Button
          key={type1}
          variant={type1 === type ? 'zinc' : 'zinc_outline'}
          onClick={() => {
            type1 === type ? setType(null) : setType(type1)
          }}
        >
          {type1}
        </Button>
      ))}
    </div>
  )
}
