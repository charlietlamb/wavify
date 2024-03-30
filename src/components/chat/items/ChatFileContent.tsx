import { cn } from '@/lib/utils'
import { useModal } from '../../../../hooks/use-modal-store'
import { Trash } from 'lucide-react'
import { useChatItemContext } from './context/chatItemContext'

export default function ChatFileContent() {
  const { onOpen } = useModal()
  const { message, canDeleteAny } = useChatItemContext()
  return (
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
  )
}
