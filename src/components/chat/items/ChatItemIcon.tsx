import { FileArchive, FileIcon, FileImage, FileMusic } from 'lucide-react'
import {
  imageExtensions,
  musicExtensions,
  zipExtensions,
} from '../data/extensions'
import { download } from '../functions/download'
import { cn } from '@/lib/utils'
import { useChatItemContext } from './context/chatItemContext'

export default function ChatItemIcon({
  fileExtension,
  file,
}: {
  fileExtension: string
  file: FileData
}) {
  const { isSender } = useChatItemContext()
  const fileClasses = 'w-10 h-10 fill-transparent stroke-zinc-200 min-w-10'
  return (
    <div
      className={cn(
        'relative mt-2 flex items-center rounded-md p-2',
        isSender && 'w-full'
      )}
    >
      {imageExtensions.includes(fileExtension) ? (
        <FileImage className={fileClasses} strokeWidth={1} />
      ) : musicExtensions.includes(fileExtension) ? (
        <FileMusic className={fileClasses} strokeWidth={1} />
      ) : zipExtensions.includes(fileExtension) ? (
        <FileArchive className={fileClasses} strokeWidth={1} />
      ) : (
        <FileIcon className={fileClasses} strokeWidth={1} />
      )}
      <button
        onClick={() => {
          download(file.url, file.name)
        }}
        className={cn(
          'ml-2 text-left text-sm text-zinc-200 hover:underline dark:text-zinc-200'
        )}
      >
        {file.name}
      </button>
    </div>
  )
}
