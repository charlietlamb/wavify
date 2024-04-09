'use client'

import { Button } from '@/components/ui/button'
import { useFilesContext } from '../state/context'
import { useModal } from '../../../../hooks/use-modal-store'
import { FolderUpIcon, Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FilesDashboardButtons({
  large = false,
}: {
  large?: boolean
}) {
  const { folders, path, space, files } = useFilesContext()
  const { onOpen } = useModal()
  const initParent = path[path.length - 1].id
  const parent = space && !initParent ? space.folder : initParent
  return (
    <div
      className={cn(
        'flex divide-x divide-zinc-700',
        large && 'gap-4 divide-x-0'
      )}
    >
      <Button
        onClick={() => onOpen('upload', { parent, space, files })}
        variant="zinc_icon_dark"
        size="icon"
        className="rounded-none"
      >
        <Upload className={large ? 'min-h-10 min-w-10' : ''} />
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
        className="rounded-none"
      >
        <FolderUpIcon className={large ? 'min-h-10 min-w-10' : ''} />
      </Button>
    </div>
  )
}
