import ChatFile from './ChatFile'
import { useFilesContext } from './context'

export default function ChatFilesRender() {
  const context = useFilesContext()
  const { renderFiles } = context
  return renderFiles.map(
    (message: MessageData | null) =>
      message?.files &&
      !message?.deleted && (
        <ChatFile key={'file' + message.id} message={message} />
      )
  )
}
