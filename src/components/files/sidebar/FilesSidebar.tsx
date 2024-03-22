import { Separator } from '@/components/ui/separator'
import FilesSearch from './FilesSearch'
import { useFilesContext } from '../state/context'
import { FileMode, foldersData } from '../data/data'
import { useUser } from '@/state/user/useUser'

export default function FilesSidebar() {
  const user = useUser()
  const { setPath } = useFilesContext()
  const newPathMap = new Map<FileMode, Path>([
    [
      'all',
      {
        id: user.id,
        name: user.username,
        type: 'library/user',
        files: true,
        folders: true,
      },
    ],
    [
      'collectives',
      {
        id: user.id,
        name: 'collectives',
        type: 'collectives',
        files: true,
        folders: true,
      },
    ],
    [
      'chats',
      {
        id: user.id,
        name: 'chats',
        type: 'chats',
        files: true,
        folders: true,
      },
    ],
  ])

  return (
    <div className="flex h-full flex-grow flex-col overflow-auto bg-background_content text-zinc-200">
      <div className="flex p-2">
        <FilesSearch />
      </div>
      <Separator className=" rounded-md bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex h-full flex-grow flex-col overflow-y-auto p-2">
        {foldersData.map((folder) => (
          <button
            key={folder.key}
            className="flex cursor-pointer items-center justify-between rounded-md p-3 transition-all hover:bg-zinc-400 dark:hover:bg-zinc-800"
            onClick={() => setPath([newPathMap.get(folder.key as FileMode)!])}
          >
            <div className="flex items-center">
              <div className="mr-3">{folder.icon}</div>
              <div>{folder.name}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
