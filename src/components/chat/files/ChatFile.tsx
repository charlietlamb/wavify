import { cn } from '@/lib/utils'
import ResizableDiv from '../../me/ResizableDiv'
import { UserAvatar } from '../../me/UserAvatar'
import isObject from '@/lib/isObject'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileArchive, FileIcon, FileImage, FileMusic } from 'lucide-react'
import { v4 as uuid } from 'uuid'
import downloadChatImage from '../actions/downloadFile'
import { useUser } from '@/state/user/useUser'
interface ChatItemProps {
  message: MessageAndAuthor
}

export default function ChatFile({ message }: ChatItemProps) {
  const user = useUser()

  const router = useRouter()
  const onMemberClick = () => {
    if (user.id === message.author) {
      return
    }
    router.push(`/user/${user.username}/chat`)
  }
  const isSender = user.id === message.author

  const fileClasses = 'w-10 h-10 fill-transparent stroke-primary min-w-10'
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg']
  const musicExtensions = [
    'mp3',
    'wav',
    'ogg',
    'flac',
    'aac',
    'wma',
    'mid',
    'midi',
  ]
  const zipExtensions = [
    'zip',
    'rar',
    '7z',
    'tar',
    'gz',
    'xz',
    'bz2',
    'lzma',
    'z',
  ]

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
  return (
    !message.deleted &&
    Array.isArray(message.files) && (
      <>
        {message.files.map((file: Json) => {
          if (file && isObject(file) && !file.deleted) {
            return (
              <ResizableDiv
                key={uuid()}
                className={cn(
                  'group relative flex w-full cursor-auto items-center rounded-lg bg-background_content p-2 transition hover:bg-primary/5',
                  isSender && 'ml-auto bg-zinc-950 hover:bg-primary/5'
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
                        typeof file.fileExt === 'string' &&
                        imageExtensions.includes(file.fileExt) ? (
                          <FileImage className={fileClasses} strokeWidth={1} />
                        ) : typeof file.fileExt === 'string' &&
                          musicExtensions.includes(file.fileExt) ? (
                          <FileMusic className={fileClasses} strokeWidth={1} />
                        ) : typeof file.fileExt === 'string' &&
                          zipExtensions.includes(file.fileExt) ? (
                          <FileArchive
                            className={fileClasses}
                            strokeWidth={1}
                          />
                        ) : (
                          <FileIcon className={fileClasses} strokeWidth={1} />
                        )}
                        <button
                          onClick={() =>
                            download(
                              typeof file.fileUrl === 'string'
                                ? file.fileUrl
                                : '',
                              typeof file.fileName === 'string'
                                ? file.fileName
                                : ''
                            )
                          }
                          className={cn(
                            'ml-2 text-left text-sm text-primary hover:underline dark:text-primary'
                          )}
                        >
                          {typeof file.fileName === 'string'
                            ? file.fileName
                            : 'Unnamed File'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ResizableDiv>
            )
          }
          return null
        })}
      </>
    )
  )
}
