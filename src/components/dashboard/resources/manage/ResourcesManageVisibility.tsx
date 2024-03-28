import { visibilities } from './data/data'
import { useManageContext } from './context/context'
import { Button } from '@/components/ui/button'

export default function ResourcesManageVisibility() {
  const { visibility, setVisibility } = useManageContext()
  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <h2 className="font-lg font-semibold">Visibilities</h2>
      {visibilities.map((v1) => (
        <Button
          key={v1}
          variant={v1 === visibility ? 'zinc' : 'zinc_outline'}
          onClick={() => {
            v1 === visibility ? setVisibility(null) : setVisibility(v1)
          }}
        >
          {v1}
        </Button>
      ))}
    </div>
  )
}
