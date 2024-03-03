import {
  Cog,
  Download,
  Folder as FolderIcon,
  MoreHorizontal,
  MoveUp,
  Trash2,
  Undo2,
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
import { useUser } from '@/state/user/useUser'
import { useCollective } from '@/state/collective/useCollective'

export default function Folder({ folder }: { folder: FolderAndSender }) {
  const { folders, parent, setParent, postbox, space } = useFilesContext()
  const { colUser } = useCollective()
  const canReceive = space?.pbReceive.includes(colUser.roles.id)
  const { onOpen } = useModal()
  const user = useUser()
  const supabase = createClientComponentClient()
  const [folderLoading, setFolderLoading] = useState(false)

  function handleFolderClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()

    if (folder.parent === 'pb') {
      setParent('u:' + folder.id)
    } else {
      setParent(folder.id)
    }
  }
  return (
    <div
      className="flex w-full cursor-pointer flex-col rounded-xl border-2 border-zinc-200 bg-zinc-900 px-2 py-4 transition-all hover:rounded-md hover:bg-zinc-800"
      onClick={(e) => handleFolderClick(e)}
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
        {
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
                {((!postbox && folder.parent) ||
                  (postbox &&
                    folder.parent !== 'pb' &&
                    !folder.parent?.includes('u:'))) && (
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
                {!postbox && (
                  <DropdownMenuItem
                    className="group flex w-full cursor-pointer justify-between"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpen('editFolder', { folder, folders, parent })
                    }}
                  >
                    <p className="transition-all group-hover:text-primary">
                      Edit
                    </p>
                    <Cog className="h-4 w-4 text-zinc-500 group-hover:animate-spin" />
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="group flex w-full cursor-pointer justify-between"
                  onClick={(e) => {
                    e.stopPropagation()
                    downloadFolder(folder, space, supabase, setFolderLoading)
                  }}
                >
                  <p className="transition-all group-hover:text-primary">
                    Download
                  </p>
                  <Download className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                </DropdownMenuItem>
                {!postbox ? (
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
                ) : (
                  (folder.parent === 'pb' || folder.parent?.includes('u:')) &&
                  (canReceive || folder.user === user.id) && (
                    <DropdownMenuItem
                      className="group flex w-full cursor-pointer justify-between"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpen('returnPost', { folder, space })
                      }}
                    >
                      <p className="transition-all group-hover:text-red-500">
                        {folder.parent === 'pb'
                          ? 'Return All Post'
                          : 'Return Post'}
                      </p>
                      <Undo2 className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  )
}
