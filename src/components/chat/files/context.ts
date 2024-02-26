import { createContext, useContext } from 'react'

interface ChatFilesWrapContext {
  chat: Chat
  searchData: (FileAndSender | null)[]
  filesRef: React.MutableRefObject<HTMLDivElement | null>
  statusFiles: 'pending' | 'error' | 'success'
  bottomRefFiles: React.MutableRefObject<HTMLDivElement | null>
  renderFiles: (MessageData | null)[]
  hasNextPageFiles: boolean
  fetchNextPageFiles: () => void
  isFetchingNextPageFiles: boolean
  setBottomRefStateFiles: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null>
  >
}

export const FilesContext = createContext<ChatFilesWrapContext | undefined>(
  undefined
)

export function useFilesContext() {
  const context = useContext(FilesContext)
  if (!context) {
    throw new Error('useFilesContext must be used within a FilesProvider')
  }
  return context
}
