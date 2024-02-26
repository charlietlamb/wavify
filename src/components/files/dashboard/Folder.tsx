import { Cog, Folder as FolderIcon, MoreHorizontal, Trash2 } from 'lucide-react'
import { useFilesContext } from '../state/context'
import { useModal } from '../../../../hooks/use-modal-store'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Folder({ folder }: { folder: FolderAndSender }) {
  const { folders, parent, setParent } = useFilesContext()
  const { onOpen } = useModal()
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
        <p className="text-md">{folder.size + 'MB'}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {folder.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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
