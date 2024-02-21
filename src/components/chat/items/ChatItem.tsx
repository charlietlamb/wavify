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
import { UserAvatar } from '../../me/UserAvatar'
import { useModal } from '../../../../hooks/use-modal-store'
import { ActionTooltip } from '../../util/ActionTooltip'
import isObject from '@/lib/isObject'
import { formatDistanceToNow } from 'date-fns'
import ResizableDiv from '../../me/ResizableDiv'
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
  message: MessageAndAuthor | null
}

export function ChatItem({ message }: ChatItemProps) {
  if (!message) return null
  const user = useUser()
  const { type } = useItemContext()
  let collectiveState = null
  if (type === 'space') {
    collectiveState = useCollective()
  }
  const collective = collectiveState ? collectiveState.collective : null
  const colUser = collectiveState ? collectiveState.colUser : null
  const { onOpen } = useModal()
  const router = useRouter()
  const onMemberClick = () => {
    if (user.id === message.author) {
      return
    }
    router.push(`/user/${user.username}/chat`)
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

  const fileClasses = 'w-10 h-10 fill-transparent stroke-primary min-w-10'

  return (
    <ResizableDiv
      className={cn(
        'group relative flex cursor-auto items-center rounded-lg bg-background_content p-4 transition',
        isSender && 'ml-auto bg-zinc-950'
      )}
    >
      <div className={cn('group flex w-full items-start gap-x-2')}>
        <div
          onClick={onMemberClick}
          className="cursor-pointer transition hover:drop-shadow-md"
        >
          <UserAvatar src={'https://github.com/shadcn.png'} />
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
          {message.deleted && Array.isArray(message.files) ? (
            <p className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-400">
              files deleted
            </p>
          ) : Array.isArray(message.files) ? (
            <div className="flex w-full items-end justify-between">
              <div className="flex w-full flex-col gap-y-1">
                {message.files.map((file: Json) => {
                  if (file && isObject(file)) {
                    const fileExtension = getFileExtension(
                      typeof file.fileUrl === 'string' ? file.fileUrl : ''
                    )
                    const isImage = imageExtensions.includes(fileExtension)
                    const isPlayable =
                      playableExtensions.includes(fileExtension)
                    return (
                      <div
                        key={typeof file.fileId === 'string' ? file.fileId : ''}
                        className="w-full"
                      >
                        {isImage ? (
                          <button
                            onClick={() => {
                              download(
                                typeof file.fileUrl === 'string'
                                  ? file.fileUrl
                                  : '',
                                typeof file.fileName === 'string'
                                  ? file.fileName
                                  : ''
                              )
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
                              alt={
                                typeof file.fileName === 'string'
                                  ? file.fileName
                                  : ''
                              }
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
                            {isObject(file) &&
                            typeof file.fileExt === 'string' &&
                            imageExtensions.includes(file.fileExt) ? (
                              <FileImage
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : typeof file.fileExt === 'string' &&
                              musicExtensions.includes(file.fileExt) ? (
                              <FileMusic
                                className={fileClasses}
                                strokeWidth={1}
                              />
                            ) : typeof file.fileExt === 'string' &&
                              zipExtensions.includes(file.fileExt) ? (
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
                                download(
                                  typeof file.fileUrl === 'string'
                                    ? file.fileUrl
                                    : '',
                                  typeof file.fileName === 'string'
                                    ? file.fileName
                                    : ''
                                )
                              }}
                              className={cn(
                                'ml-2 text-left text-sm text-primary hover:underline dark:text-primary'
                              )}
                            >
                              {typeof file.fileName === 'string'
                                ? file.fileName
                                : 'Unnamed File'}
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  }
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
