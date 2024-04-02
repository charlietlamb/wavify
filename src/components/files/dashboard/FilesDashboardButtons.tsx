'use client'

import { Button } from '@/components/ui/button'
import { useFilesContext } from '../state/context'
import { useModal } from '../../../../hooks/use-modal-store'
import { FolderUpIcon, Upload } from 'lucide-react'

export default function FilesDashboardButtons() {
  const { folders, path, space, files } = useFilesContext()
  const { onOpen } = useModal()
  const initParent = path[path.length - 1].id
  const parent = space && !initParent ? space.folder : initParent
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onOpen('upload', { parent, space, files })}
        variant="zinc_icon_dark"
        size="icon"
      >
        <Upload />
      </Button>
      <Button
        onClick={() =>
          onOpen('createFolder', {
            folders,
            parent,
            space,
          })
        }
        variant="zinc_icon_dark"
        size="icon"
      >
        <FolderUpIcon />
      </Button>
    </div>
  )
}
