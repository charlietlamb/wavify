'use client'

import { Button } from '@/components/ui/button'
import { useFilesContext } from '../state/context'
import { useModal } from '../../../../hooks/use-modal-store'

export default function FilesDashboardButtons() {
  const { folders, parent } = useFilesContext()
  const { onOpen } = useModal()

  return (
    <div className="flex gap-x-2">
      <Button onClick={() => onOpen('upload', { parent })}>Upload Files</Button>
      <Button
        onClick={() =>
          onOpen('createFolder', {
            folders,
            parent,
          })
        }
      >
        New Folder
      </Button>
    </div>
  )
}
