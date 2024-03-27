'use client'
import {
  FileArchive,
  FileIcon,
  FileImage,
  FileMusic,
  Trash,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { UserAvatar } from '../../utils/UserAvatar'
import { useModal } from '../../../../hooks/use-modal-store'
import { ActionTooltip } from '../../util/ActionTooltip'
import isObject from '@/lib/isObject'
import { formatDistanceToNow } from 'date-fns'
import ResizableDiv from '../../utils/ResizableDiv'
import {
  imageExtensions,
  musicExtensions,
  playableExtensions,
  zipExtensions,
} from '../data/extensions'
import FilePlayer from '@/components/audio/FilePlayer'
import { download } from '../functions/download'
import { useUser } from '@/state/user/useUser'
import { useItemContext } from './context'
import { useCollective } from '@/state/collective/useCollective'
interface ChatItemProps {
  message: MessageData | null
}

export function ChatItem({ message }: ChatItemProps) {
  const user = useUser()
  const { type } = useItemContext()
  let collectiveState = null
  if (type === 'space') {
    collectiveState = useCollective()
  }
  const collective = collectiveState ? collectiveState.collective : null
  const colUser = collectiveState ? collectiveState.colUser : null
  const { onOpen } = useModal()
  if (!message) return null
  const otherUser = message.users
  const files = message.fileData
  const router = useRouter()
  const onMemberClick = () => {
    if (user.id === message.author) {
      return
    }
    router.push(`/user/${message.author}/chat`)
  }
  const getFileExtension = (url: string | undefined): string => {
    if (typeof url === 'string') {
      const parts = url.split('.')
      return parts.length > 0 ? parts.pop()?.toLowerCase() || '' : ''
    }
    return ''
  }
  var canDeleteAny = false
  const role = colUser ? colUser.roles : ''
  if (collective && isObject(role) && role.canMessages) {
    canDeleteAny = true
  }
  const isSender = user.id === message.author
  if (!collective && isSender) {
    canDeleteAny = true
  }

  const fileClasses = 'w-10 h-10 fill-transparent stroke-zinc-200 min-w-10'

  return (
    <ResizableDiv
      className={cn(
        'group relative flex cursor-auto items-center rounded-lg border border-zinc-900 bg-transparent p-4 transition hover:border-zinc-800',
        isSender && 'ml-auto border-zinc-700 hover:border-zinc-600'
      )}
    >
      <div className={cn('group flex w-full items-start gap-x-2')}>
        <div
          onClick={onMemberClick}
          className="cursor-pointer transition hover:drop-shadow-md"
        >
          <UserAvatar user={otherUser} />
        </div>
        <div className="flex w-full flex-col">
          <div className={cn('flex items-center gap-x-2')}>
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="cursor-pointer text-sm font-semibold text-white hover:underline"
              >
                {isObject(message.users) ? message.users.username : null}
              </p>
              {isObject(role) && (
                <ActionTooltip
                  label={typeof role.name === 'string' ? role.name : ''}
                >
                  {role.emoji}
                </ActionTooltip>
              )}
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {typeof message.createdAt === 'string'
                ? formatDistanceToNow(new Date(message.createdAt)) + ' ago'
                : ''}
            </span>
          </div>
          {message.deleted && Array.isArray(files) ? (
            <p className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-400">
              files deleted
            </p>
          ) : message.files ? (
            <div className="flex w-full items-end justify-between">
              <div className="flex w-full flex-col gap-y-1">
                {Array.isArray(files) &&
                  files.map((file: FileData) => {
                    const fileExtension = getFileExtension(file.name)
                    const isImage = imageExtensions.includes(fileExtension)
                    const isPlayable =
                      playableExtensions.includes(fileExtension)
                    return (
                      <div key={file.id} className="w-full">
                        {isImage ? (
                          <button
                            onClick={() => {
                              download(file.url, file.name)
                            }}
                            className="relative mt-2 flex aspect-square h-48 w-48 items-center justify-start overflow-hidden rounded-md border bg-secondary"
                          >
                            <Image
                              src={
                                typeof 'https://github.com/shadcn.png' ===
                                'string'
                                  ? 'https://github.com/shadcn.png'
                                  : ''
                              }
                              alt={file.name}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ) : isPlayable ? (
                          <FilePlayer
                            file={file as FileData}
                            otherUser={message.users as User}
                          />
                        ) : (
                          <div
                            className={cn(
                              'relative mt-2 flex items-center rounded-md p-2',
                              isSender && 'w-full'
                            )}
                          >
                            {imageExtensions.includes(fileExtension) ? (
                              <FileImage
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : musicExtensions.includes(fileExtension) ? (
                              <FileMusic
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : zipExtensions.includes(fileExtension) ? (
                              <FileArchive
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : (
                              <FileIcon
                                className={fileClasses}
                                strokeWidth={1}
                              />
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
                        )}
                      </div>
                    )
                    return null
                  })}
              </div>
              {canDeleteAny && (
                <Trash
                  onClick={() =>
                    onOpen('deleteMessage', {
                      message: message,
                    })
                  }
                  className="h-auto min-w-5 max-w-5 cursor-pointer text-zinc-500 transition hover:text-zinc-600 dark:hover:text-zinc-300"
                />
              )}
            </div>
          ) : (
            <div
              className={cn(
                'flex items-end justify-between text-sm text-zinc-600 dark:text-zinc-300',
                message.deleted &&
                  'mt-1 text-xs italic text-zinc-500 dark:text-zinc-400'
              )}
            >
              {message.deleted ? (
                'message deleted'
              ) : typeof message.content === 'string' ? (
                <>
                  <div className="flex-grow">{message.content}</div>
                  {canDeleteAny && (
                    <Trash
                      onClick={() =>
                        onOpen('deleteMessage', {
                          message: message,
                        })
                      }
                      className="h-auto min-w-5 max-w-5 cursor-pointer text-zinc-500 transition hover:text-zinc-600 dark:hover:text-zinc-300"
                    />
                  )}
                </>
              ) : (
                ''
              )}
              {message.edited && !message.deleted && (
                <span className="mx-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </ResizableDiv>
  )
}
