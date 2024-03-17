import {
  Cog,
  Download,
  Folder as FolderIcon,
  MessageCircle,
  MessageCircleOff,
  MessageCircleQuestionIcon,
  MessagesSquare,
  MinusCircle,
  MoreHorizontal,
  MoveUp,
  Trash2,
  Undo2,
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
import { downloadFolder } from '../functions/downloadFolder'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Spinner from '@/components/utils/Spinner'
import { useEffect, useState } from 'react'
import { moveFolderToParent } from '../functions/moveFolderToParent'
import { useUser } from '@/state/user/useUser'
import { useCollective } from '@/state/collective/useCollective'
import { isUUID } from '@/lib/isUUID'
import { checkFolderHasComments } from '@/components/collective/feedback/functions/checkFolderHasComments'
import { handlePathFolderClick } from '../functions/handlePathFolderClick'

export default function Folder({ folder }: { folder: FolderAndSender }) {
  const {
    folders,
    path,
    setPath,
    postbox,
    postboxSend,
    space,
    transient,
    transientPost,
    transientFolders,
    setTransientFolders,
    feedback,
    feedbackGive,
  } = useFilesContext()
  const { colUser } = useCollective()
  const canReceive = space?.pbReceive.includes(colUser.roles.id)
  const { onOpen } = useModal()
  const user = useUser()
  const supabase = createClientComponentClient()
  const [folderLoading, setFolderLoading] = useState(false)
  const parent = path[path.length - 1].id

  function handleFolderClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation()
    handlePathFolderClick(path, setPath, folder)
  }
  const [comments, setComments] = useState<CommentAndUser[]>([])

  useEffect(() => {
    checkFolderHasComments(supabase, folder, setComments)
  }, [])
  return (
    <div
      className="flex w-full cursor-pointer flex-col rounded-xl border border-zinc-700 px-2 py-4 transition-all hover:rounded-md hover:border-zinc-200"
      onClick={(e) => handleFolderClick(e)}
    >
      <div className="flex items-center gap-x-2">
        <FolderIcon className="min-h-6 min-w-6" />
        <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg">
          {folder.name}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-md">
          {folder.size !== undefined
            ? getFileSizeString(folder.size)
            : 'calculating size...'}
        </p>
        {
          <DropdownMenu>
            {!folderLoading ? (
              <DropdownMenuTrigger asChild>
                <MoreHorizontal />
              </DropdownMenuTrigger>
            ) : (
              <Spinner className="h-6 w-6" color="#FFFFFF" />
            )}
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {folder.name}
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
                        folder,
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
                {(!feedback || (feedback && feedbackGive)) &&
                  isUUID(folder.id) && (
                    <>
                      <DropdownMenuItem
                        className="group flex w-full cursor-pointer justify-between"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (feedbackGive) {
                            onOpen('leaveComment', {
                              space,
                              folder,
                              heading: 'Give Feedback',
                              description:
                                'Give feedback to a producer. Let them know what you think about their work.',
                            })
                          } else {
                            onOpen('leaveComment', {
                              space,
                              folder,
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
                {((!postbox && !transient && !feedback && folder.parent) ||
                  (postbox &&
                    postboxSend &&
                    folder.user === user.id &&
                    folder.parent !== 'pb' &&
                    !folder.parent?.includes('u:')) ||
                  (transient &&
                    transientPost &&
                    folder.user === user.id &&
                    folder.parent !== 't' &&
                    feedback &&
                    feedbackGive &&
                    folder.user === user.id &&
                    folder.parent !== 'f') ||
                  !folder.parent?.includes('fd:')) && (
                  <>
                    <DropdownMenuItem
                      className="group flex w-full cursor-pointer justify-between"
                      onClick={(e) => {
                        e.stopPropagation()
                        moveFolderToParent(supabase, folder)
                      }}
                    >
                      <p className="transition-all group-hover:text-primary">
                        Move To Parent
                      </p>
                      <MoveUp className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                {!postbox && !transient && !feedback && (
                  <DropdownMenuItem
                    className="group flex w-full cursor-pointer justify-between"
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpen('editFolder', { folder, folders, parent })
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
                    downloadFolder(folder, space, supabase, setFolderLoading)
                  }}
                >
                  <p className="transition-all group-hover:text-primary">
                    Download
                  </p>
                  <Download className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                </DropdownMenuItem>
                {!postbox && !transient && !feedback ? (
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
                ) : postbox ? (
                  (folder.parent === 'pb' || folder.parent?.includes('u:')) &&
                  (canReceive || folder.user === user.id) && (
                    <DropdownMenuItem
                      className="group flex w-full cursor-pointer justify-between"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpen('returnPost', { folder, space })
                      }}
                    >
                      <p className="transition-all group-hover:text-red-500">
                        {folder.parent === 'pb'
                          ? 'Return All Post'
                          : 'Return Post'}
                      </p>
                      <Undo2 className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                    </DropdownMenuItem>
                  )
                ) : feedback ? (
                  (folder.parent === 'f' || folder.parent?.includes('fd:')) &&
                  (feedbackGive || folder.user === user.id) && (
                    <DropdownMenuItem
                      className="group flex w-full cursor-pointer justify-between"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpen('removeFeedback', { folder, space })
                      }}
                    >
                      <p className="transition-all group-hover:text-red-500">
                        {folder.parent === 'f'
                          ? 'Remove All Feedback'
                          : 'Remove Feedback'}
                      </p>
                      <MessageCircleOff className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                    </DropdownMenuItem>
                  )
                ) : (
                  folder.parent === 't' &&
                  (transientPost || folder.user === user.id) && (
                    <DropdownMenuItem
                      className="group flex w-full cursor-pointer justify-between"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpen('removeTransient', {
                          folder,
                          space,
                          transientFolders,
                          setTransientFolders,
                        })
                      }}
                    >
                      <p className="transition-all group-hover:text-red-500">
                        Remove Folder
                      </p>
                      <MinusCircle className="h-4 w-4 text-zinc-500 group-hover:animate-pulse" />
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </div>
    </div>
  )
}
