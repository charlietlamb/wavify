import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface ChatItemContext {
  user: User
  message: MessageData
  role: Role | null
  isSender: boolean
  canDeleteAny: boolean
  files: FileData[] | null
  external: boolean
}

export const ChatItemContext = createContext<ChatItemContext | undefined>(
  undefined
)

export function useChatItemContext() {
  const context = useContext(ChatItemContext)
  if (!context) {
    throw new Error('useChatItemContext must be used within a ChatItemProvider')
  }
  return context
}
