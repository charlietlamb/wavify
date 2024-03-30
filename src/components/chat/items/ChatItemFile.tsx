import { Trash } from 'lucide-react'
import { useModal } from '../../../../hooks/use-modal-store'
import { getFileExtension } from './functions/getFileExtension'
import { imageExtensions, playableExtensions } from '../data/extensions'
import FilePlayer from '@/components/audio/FilePlayer'
import ChatItemIcon from './ChatItemIcon'
import ChatItemImage from './ChatItemImage'
import { useChatItemContext } from './context/chatItemContext'

export default function ChatItemFile() {
  const { message, files, isSender, canDeleteAny } = useChatItemContext()
  const { onOpen } = useModal()

  return (
    <div className="flex w-full items-end justify-between">
      <div className="flex w-full flex-col gap-y-1">
        {Array.isArray(files) &&
          files.map((file: FileData) => {
            const fileExtension = getFileExtension(file.name)
            const isImage = imageExtensions.includes(fileExtension)
            const isPlayable = playableExtensions.includes(fileExtension)
            return (
              <div key={file.id} className="w-full">
                {isImage ? (
                  <ChatItemImage file={file} />
                ) : isPlayable ? (
                  <FilePlayer
                    file={file as FileData}
                    otherUser={message.users as User}
                  />
                ) : (
                  <ChatItemIcon
                    fileExtension={fileExtension}
                    file={file}
                  />
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
              message,
            })
          }
          className="h-auto min-w-5 max-w-5 cursor-pointer text-zinc-500 transition hover:text-zinc-600 dark:hover:text-zinc-300"
        />
      )}
    </div>
  )
}
