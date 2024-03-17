'use client'

import { Button } from '@/components/ui/button'
import { useFilesContext } from '../state/context'
import { useModal } from '../../../../hooks/use-modal-store'

export default function FilesDashboardButtons() {
  const { folders, path, space, files } = useFilesContext()
  const { onOpen } = useModal()
  const initParent = path[path.length - 1].id
  const parent = space && !initParent ? space.folder : initParent
  return (
    <div className="flex gap-x-2">
      <Button
        onClick={() => onOpen('upload', { parent, space, files })}
        variant="zinc_outline"
      >
        Upload Files
      </Button>
      <Button
        onClick={() =>
          onOpen('createFolder', {
            folders,
            parent,
            space,
          })
        }
        variant="zinc_outline"
      >
        New Folder
      </Button>
    </div>
  )
}
