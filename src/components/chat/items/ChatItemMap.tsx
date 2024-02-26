import { useEffect } from 'react'
import { ChatItem } from './ChatItem'
import { useItemContext } from './context'

export default function ChatItemMap() {
  const { render } = useItemContext()
  return render.map(
    (message: MessageData | null) =>
      message && <ChatItem key={message.id} message={message} />
  )
}
