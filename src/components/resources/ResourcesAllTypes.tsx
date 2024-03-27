import { resourceTypes } from '../dashboard/resources/upload/data/data'
import { Button } from '../ui/button'
import { useResourcesContext } from './context/resourcesContext'

export default function ResourcesAllTypes() {
  const { type, setType } = useResourcesContext()
  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="font-lg font-semibold">Type</h2>
      {resourceTypes.map((type1) => (
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
