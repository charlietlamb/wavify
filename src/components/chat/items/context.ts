import { createContext, useContext } from 'react'

interface ChatItemWrapContext {
  chatRef: React.MutableRefObject<HTMLDivElement | null>
  bottomRef: React.MutableRefObject<HTMLDivElement | null>
  render: (MessageData | null)[]
  chat: Chat
  type: 'chat' | 'space'
  fileTab?: boolean
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  name: string
  status: 'success' | 'pending' | 'error'
  setBottomRefState: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
}

export const ItemContext = createContext<ChatItemWrapContext | undefined>(
  undefined
)

export function useItemContext() {
  const context = useContext(ItemContext)
  if (!context) {
    throw new Error('useItemsContext must be used within a ItemsProvider')
  }
  return context
}
