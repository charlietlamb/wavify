import { cn } from '@/lib/utils'
import ResizableDiv from '../../utils/ResizableDiv'
import { UserAvatar } from '../../utils/UserAvatar'
import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'
import downloadChatImage from '../actions/downloadFile'
import { useUser } from '@/state/user/useUser'
import { Button } from '@/components/ui/button'
import { download } from '../functions/download'
interface ChatItemProps {
  message: MessageData
}

export default function ChatFile({ message }: ChatItemProps) {
  const user = useUser()
  const otherUser = message.users
  const files = message.fileData

  const router = useRouter()
  const onMemberClick = () => {
    if (user.id === message.author) {
      return
    }
    router.push(`/user/${message.author}`)
  }
  const isSender = user.id === message.author

  if (!Array.isArray(files)) return null
  return (
    <>
      {!message.deleted &&
        files.map((file: FileData) => {
          return (
            <ResizableDiv
              key={uuid()}
              className={cn(
                'group relative flex w-full cursor-auto items-center rounded-lg border border-zinc-900 bg-transparent p-2 transition hover:border-zinc-800',
                isSender && 'ml-auto border-zinc-700 hover:border-zinc-600'
              )}
            >
              <div className={cn('group flex w-full items-center')}>
                <div
                  onClick={onMemberClick}
                  className="cursor-pointer transition hover:drop-shadow-md"
                >
                  <UserAvatar user={otherUser} />
                </div>

                <div className="overflow-y-auto">
                  <Button
                    onClick={() => download(file.url, file.name)}
                    className={cn(
                      'whitespace-normal text-left text-sm text-zinc-200 hover:underline dark:text-zinc-200'
                    )}
                    variant="link"
                  >
                    {file.name}
                  </Button>
                </div>
              </div>
            </ResizableDiv>
          )
        })}
    </>
  )
}
