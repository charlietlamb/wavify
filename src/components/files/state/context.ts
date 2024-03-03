import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { FileMode, SortingType, View } from '../data/data'

interface ChatFilesWrapContext {
  searchFiles: FileAndSender[]
  mode: FileMode
  setMode: Dispatch<SetStateAction<FileMode>>
  path: Path[]
  setPath: Dispatch<SetStateAction<Path[]>>
  parent: string | null
  setParent: Dispatch<SetStateAction<string | null>>
  sorting: SortingType
  setSorting: Dispatch<SetStateAction<SortingType>>
  filterByMusic: boolean
  setFilterByMusic: Dispatch<SetStateAction<boolean>>
  files: FileAndSender[]
  setFiles: Dispatch<SetStateAction<FileAndSender[]>>
  folders: FolderAndSender[]
  setFolders: Dispatch<SetStateAction<FolderAndSender[]>>
  view: View
  setView: Dispatch<SetStateAction<View>>
  space: Space | undefined
  postbox: boolean
  postboxSend: boolean
  postboxReceive: boolean
  transient: boolean
  transientPost: boolean
  transientAccess: boolean
}

export const FilesContext = createContext<ChatFilesWrapContext | undefined>(
  undefined
)

export function useFilesContext() {
  const context = useContext(FilesContext)
  if (!context)
    throw new Error('useFilesContext must be used within a FilesProvider')

  return context
}
