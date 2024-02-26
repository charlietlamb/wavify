'use client'

import { cn } from '@/lib/utils'
import { useFilesContext } from '../state/context'
import File from './File'
import Folder from './Folder'

export default function FilesFiles() {
  const { files, folders, view } = useFilesContext()

  return (
    <div
      className={cn(
        'grid grid-cols-1 items-start justify-items-start gap-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        view === 'column' &&
          'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1'
      )}
    >
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
      {files.map((file) => (
        <File key={file.id} file={file} />
      ))}
    </div>
  )
}
