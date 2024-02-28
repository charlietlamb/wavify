import { useFilesContext } from '../state/context'
import { useEffect, useState } from 'react'
import { useUser } from '@/state/user/useUser'
import { Button } from '@/components/ui/button'

export default function FilesDashboardBreadcrumb() {
  const { path, setParent, space } = useFilesContext()
  const user = useUser()
  const [breadcrumb, setBreadcrumb] = useState<Path[]>([])
  useEffect(() => {
    const pathInOrder = path.slice().reverse()
    setBreadcrumb(
      !space
        ? [{ id: null, name: user.username }, ...pathInOrder]
        : pathInOrder.length
          ? pathInOrder
          : [{ id: space.folder, name: space.name }]
    )
  }, [path])

  return (
    <div className="flex text-lg text-zinc-600">
      {breadcrumb.map((path) => {
        return (
          <div key={path.id} className="flex items-center">
            /
            <Button
              variant="link"
              onClick={() => setParent(path.id)}
              className="h-auto p-0 text-zinc-600"
            >
              {path.name}
            </Button>
          </div>
        )
      })}
    </div>
  )
}
