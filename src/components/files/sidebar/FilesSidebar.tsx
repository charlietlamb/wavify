import { Separator } from '@/components/ui/separator'
import FilesSearch from './FilesSearch'
import { useFilesContext } from '../state/context'
import { foldersData } from '../data/data'

export default function FilesSidebar() {
  const { setMode } = useFilesContext()

  return (
    <div className="flex h-full flex-grow flex-col overflow-auto bg-background_content px-3 pt-4 text-zinc-200">
      <FilesSearch />
      <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex h-full flex-grow flex-col overflow-y-auto">
        {foldersData.map((folder) => (
          <button
            key={folder.key}
            className="flex cursor-pointer items-center justify-between rounded-md p-3 transition-all hover:bg-zinc-400 dark:hover:bg-zinc-800"
            onClick={() => setMode(folder.key)}
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
