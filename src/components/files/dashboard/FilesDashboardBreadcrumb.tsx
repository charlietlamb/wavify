import { useFilesContext } from '../state/context'
import { Button } from '@/components/ui/button'
import { handlePathClick } from '../functions/handlePathClick'

export default function FilesDashboardBreadcrumb() {
  const { path, setPath } = useFilesContext()

  return (
    <div className="flex text-lg text-zinc-600">
      {path.map((path1) => {
        return (
          <div key={path1.id} className="flex items-center">
            /
            <Button
              variant="link"
              onClick={() => handlePathClick(path1.id, path, setPath)}
              className="h-auto p-0 text-zinc-600"
            >
              {path1.name}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
