import {
  Cog,
  Download,
  Folder as FolderIcon,
  MoreHorizontal,
  MoveUp,
  Trash2,
} from 'lucide-react'
import { useFilesContext } from '../state/context'
import { useModal } from '../../../../hooks/use-modal-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getFileSizeString } from '../functions/getFileSizeString'
import { downloadFolder } from '../functions/downloadFolder'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Spinner from '@/components/me/Spinner'
import { useState } from 'react'
import { moveFolderToParent } from '../functions/moveFolderToParent'

export default function Folder({ folder }: { folder: FolderAndSender }) {
  const { folders, parent, setParent } = useFilesContext()
  const { onOpen } = useModal()
  const supabase = createClientComponentClient()
  const [folderLoading, setFolderLoading] = useState(false)
  return (
    <div
      className="flex w-full cursor-pointer flex-col rounded-xl border-2 border-zinc-200 bg-zinc-900 px-2 py-4 transition-all hover:rounded-md hover:bg-zinc-800"
      onClick={(e) => {
        e.stopPropagation()
        setParent(folder.id)
      }}
    >
      <div className="flex items-center gap-x-2">
        <FolderIcon className="min-h-6 min-w-6" />
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {folder.name}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-md">
          {folder.size !== undefined
            ? getFileSizeString(folder.size)
            : 'calculating size...'}
        </p>
        <DropdownMenu>
          {!folderLoading ? (
            <DropdownMenuTrigger asChild>
              <MoreHorizontal />
            </DropdownMenuTrigger>
          ) : (
            <Spinner className="h-6 w-6" color="#FFFFFF" />
          )}
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {folder.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {folder.parent && (
                <>
                  <DropdownMenuItem
                    className="group flex w-full cursor-pointer justify-between"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveFolderToParent(supabase, folder)
                    }}
                  >
                    <p className="transition-all group-hover:text-primary">
                      Move To Parent
                    </p>
                    <MoveUp className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem
                className="group flex w-full cursor-pointer justify-between"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpen('editFolder', { folder, folders, parent })
                }}
              >
                <p className="transition-all group-hover:text-primary">Edit</p>
                <Cog className="h-4 w-4 text-zinc-500 group-hover:animate-spin" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group flex w-full cursor-pointer justify-between"
                onClick={(e) => {
                  e.stopPropagation()
                  downloadFolder(folder, supabase, setFolderLoading)
                }}
              >
                <p className="transition-all group-hover:text-primary">
                  Download
                </p>
                <Download className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group flex w-full cursor-pointer justify-between"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpen('deleteFolder', { folder })
                }}
              >
                <p className="transition-all group-hover:text-red-500">
                  Delete
                </p>
                <Trash2 className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
