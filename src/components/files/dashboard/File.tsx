import {
  Cog,
  Download,
  File as FileIcon,
  MoreHorizontal,
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
import { download } from '@/components/chat/functions/download'

export default function File({ file }: { file: FileAndSender }) {
  const { files, parent, setParent } = useFilesContext()
  const { onOpen } = useModal()
  return (
    <div className="flex w-full flex-col rounded-xl border-2 border-zinc-200 px-2 py-4 transition-all hover:rounded-md hover:bg-zinc-950">
      <div className="flex items-center gap-x-2">
        <FileIcon className="min-h-6 min-w-6" />
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {file.name}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-md">{getFileSizeString(file.size)}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="overflow-hidden overflow-ellipsis whitespace-nowrap">
              {file.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                className="group flex w-full cursor-pointer justify-between"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpen('editFile', { file, files, parent })
                }}
              >
                <p className="transition-all group-hover:text-primary">Edit</p>
                <Cog className="h-4 w-4 text-zinc-500 group-hover:animate-spin" />
              </DropdownMenuItem>
              <DropdownMenuItem
                className="group flex w-full cursor-pointer justify-between"
                onClick={(e) => {
                  e.stopPropagation()
                  download(file.url, file.name)
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
                  onOpen('deleteFile', { file })
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
