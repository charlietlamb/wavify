import ChatFileContent from './ChatFileContent'
import ChatFileExternal from './ChatFileExternal'
import ChatItemFile from './ChatItemFile'
import { useChatItemContext } from './context/chatItemContext'

export default function ChatItemMessage() {
  const { message, files, external } = useChatItemContext()
  return (
    <>
      {message.deleted && Array.isArray(files) ? (
        <p className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-400">
          files deleted
        </p>
      ) : external ? (
        <ChatFileExternal />
      ) : message.files && files ? (
        <ChatItemFile />
      ) : (
        <ChatFileContent />
      )}
    </>
  )
}
