import {
  Cog,
  Download,
  FileArchive,
  File as FileIcon,
  FileImage,
  FileMusic,
  MessageCircle,
  MessageCircleQuestionIcon,
  MessagesSquare,
  MoreHorizontal,
  MoveUp,
  Trash2,
  View,
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
import { moveFileToParent } from '../functions/moveFileToParent'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import isObject from '@/lib/isObject'
import {
  imageExtensions,
  musicExtensions,
  playableExtensions,
  zipExtensions,
} from '@/components/chat/data/extensions'
import { useUser } from '@/state/user/useUser'
import FilePlayButton from './FilePlayButton'
import { isUUID } from '@/lib/isUUID'
import { useEffect, useState } from 'react'
import { checkFileHasComments } from '@/components/collective/feedback/functions/checkFileHasComments'

export default function File({ file }: { file: FileAndSender }) {
  const { space, files, path, postbox, transient, feedback, feedbackGive } =
    useFilesContext()
  const parent = path[path.length - 1].id
  const user = useUser()
  const fileExtension = file.name.split('.').pop()!
  const { onOpen } = useModal()
  const supabase = createClientComponentClient()
  const fileClasses = 'min-w-6 min-h-6'
  const [comments, setComments] = useState<CommentAndUser[]>([])

  useEffect(() => {
    checkFileHasComments(supabase, file, setComments)
  }, [])
  return (
    <div className="flex w-full cursor-pointer flex-col rounded-xl border border-zinc-700 px-2 py-4 transition-all hover:rounded-md hover:border-zinc-200">
      <div className="flex items-center gap-x-2">
        {isObject(file) && playableExtensions.includes(fileExtension) ? (
          <FilePlayButton file={file} className={fileClasses} />
        ) : imageExtensions.includes(fileExtension) ? (
          <FileImage className={fileClasses} />
        ) : musicExtensions.includes(fileExtension) ? (
          <FileMusic className={fileClasses} />
        ) : zipExtensions.includes(fileExtension) ? (
          <FileArchive className={fileClasses} />
        ) : (
          <FileIcon className={fileClasses} />
        )}
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {file.name}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex gap-x-2">
          {!!file.preview && (
            <FilePlayButton
              file={file}
              className={fileClasses}
              preview={true}
            />
          )}
          <p className="text-md">{getFileSizeString(file.size)}</p>
        </div>
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
              {!!comments.length && (
                <DropdownMenuItem
                  className="group flex w-full cursor-pointer justify-between"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpen('comments', {
                      space,
                      file,
                      feedbackGive,
                    })
                  }}
                >
                  <p className="transition-all group-hover:text-primary">
                    {feedbackGive ? 'View Feedback' : 'View Comments'}
                  </p>
                  <MessagesSquare className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                </DropdownMenuItem>
              )}
              {(!feedback || (feedback && feedbackGive)) && isUUID(file.id) && (
                <>
                  <DropdownMenuItem
                    className="group flex w-full cursor-pointer justify-between"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (feedbackGive) {
                        onOpen('leaveComment', {
                          space,
                          file,
                          heading: 'Give Feedback',
                          description:
                            'Give feedback to a producer. Let them know what you think about their work.',
                          setComments,
                        })
                      } else {
                        onOpen('leaveComment', {
                          space,
                          file,
                          setComments,
                        })
                      }
                    }}
                  >
                    <p className="transition-all group-hover:text-primary">
                      {feedbackGive ? 'Give Feedback' : 'Leave Comment'}
                    </p>
                    {feedbackGive ? (
                      <MessageCircleQuestionIcon className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                    ) : (
                      <MessageCircle className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                    )}
                  </DropdownMenuItem>
                </>
              )}
              {file.user === user.id &&
                playableExtensions.includes(fileExtension) && (
                  <DropdownMenuItem
                    className="group flex w-full cursor-pointer justify-between"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpen('editPreview', { file })
                    }}
                  >
                    <p className="transition-all group-hover:text-primary">
                      Edit Preview Time
                    </p>
                    <View className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                  </DropdownMenuItem>
                )}
              {!postbox && !transient && !feedback && file.folder && (
                <>
                  <DropdownMenuItem
                    className="group flex w-full cursor-pointer justify-between"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveFileToParent(supabase, file)
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
              {((!postbox && !transient && !feedback) ||
                file.user === user.id) && (
                <DropdownMenuItem
                  className="group flex w-full cursor-pointer justify-between"
                  onClick={(e) => {
                    e.stopPropagation()
                    onOpen('editFile', { file, files, parent })
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
                  download(file.url, file.name)
                }}
              >
                <p className="transition-all group-hover:text-primary">
                  Download
                </p>
                <Download className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
              </DropdownMenuItem>
              {((!postbox && !transient && !feedback) ||
                file.user === user.id) && (
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
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
