import { cn } from '@/lib/utils'
import ResizableDiv from '../../utils/ResizableDiv'
import { UserAvatar } from '../../utils/UserAvatar'
import isObject from '@/lib/isObject'
import { useRouter } from 'next/navigation'
import { FileArchive, FileIcon, FileImage, FileMusic } from 'lucide-react'
import { v4 as uuid } from 'uuid'
import downloadChatImage from '../actions/downloadFile'
import { useUser } from '@/state/user/useUser'
import {
  imageExtensions,
  musicExtensions,
  zipExtensions,
} from '../data/extensions'
interface ChatItemProps {
  message: MessageData
}

export default function ChatFile({ message }: ChatItemProps) {
  const user = useUser()
  const files = message.fileData

  const router = useRouter()
  const onMemberClick = () => {
    if (user.id === message.author) {
      return
    }
    router.push(`/user/${user.username}/chat`)
  }
  const isSender = user.id === message.author

  const fileClasses =
    'w-10 h-10 fill-transparent stroke-primary min-w-10 text-zinc-200'

  async function download(fileUrl: string, fileName: string) {
    const url = await downloadChatImage(fileUrl)
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }
  if (!Array.isArray(files)) return null
  return (
    !message.deleted && (
      <>
        {files.map((file: FileData) => {
          const fileExtension = file.name.split('.').pop()?.toLowerCase() || ''
          return (
            <ResizableDiv
              key={uuid()}
              className={cn(
                'group relative flex w-full cursor-auto items-center rounded-lg border border-zinc-900 bg-transparent p-2 transition hover:border-zinc-800',
                isSender && 'ml-auto border-zinc-700 hover:border-zinc-600'
              )}
            >
              <div className={cn('group flex w-full items-center gap-x-2')}>
                <div
                  onClick={onMemberClick}
                  className="cursor-pointer transition hover:drop-shadow-md"
                >
                  <UserAvatar src={'https://github.com/shadcn.png'} />
                </div>
                <div className="flex w-full flex-col">
                  <div>
                    <div
                      className={cn(
                        'relative flex items-center rounded-md p-2',
                        isSender && 'w-full'
                      )}
                    >
                      {isObject(file) &&
                      imageExtensions.includes(fileExtension) ? (
                        <FileImage className={fileClasses} strokeWidth={1} />
                      ) : musicExtensions.includes(fileExtension) ? (
                        <FileMusic className={fileClasses} strokeWidth={1} />
                      ) : zipExtensions.includes(fileExtension) ? (
                        <FileArchive className={fileClasses} strokeWidth={1} />
                      ) : (
                        <FileIcon className={fileClasses} strokeWidth={1} />
                      )}
                      <button
                        onClick={() => download(file.url, file.name)}
                        className={cn(
                          'ml-2 text-left text-sm text-zinc-200 hover:underline dark:text-zinc-200'
                        )}
                      >
                        {file.name}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ResizableDiv>
          )
        })}
      </>
    )
  )
}
