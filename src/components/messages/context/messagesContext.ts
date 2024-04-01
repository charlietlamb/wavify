import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export interface MessagesContext {
  chat: ChatAndUser
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  chats: ChatAndUser[]
  setChats: Dispatch<SetStateAction<ChatAndUser[]>>
}

export const MessagesContext = createContext<MessagesContext | undefined>(
  undefined
)

export function useMessagesContext() {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error(
      'useMessagesContext must be used within a ResourceMessagesProvider'
    )
  }
  return context
}
