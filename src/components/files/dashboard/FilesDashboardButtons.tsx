'use client'

import { Button } from '@/components/ui/button'
import { useFilesContext } from '../state/context'
import { useModal } from '../../../../hooks/use-modal-store'

export default function FilesDashboardButtons() {
  const { folders, parent: initParent, space, files } = useFilesContext()
  const { onOpen } = useModal()
  const parent = space && !initParent ? space.folder : initParent
  return (
    <div className="flex gap-x-2">
      <Button onClick={() => onOpen('upload', { parent, space, files })}>
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
      >
        New Folder
      </Button>
    </div>
  )
}
