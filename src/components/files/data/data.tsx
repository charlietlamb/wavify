import { FolderOpen, MessagesSquare, UsersRound } from 'lucide-react'

export type FileMode = 'all' | 'collectives' | 'chats'
export const foldersData: {
  name: string
  icon: JSX.Element
  key: FileMode
}[] = [
  {
    name: 'All Files',
    icon: <FolderOpen />,
    key: 'all',
  },
  {
    name: 'Collectives',
    icon: <UsersRound />,
    key: 'collectives',
  },
  {
    name: 'Chats',
    icon: <MessagesSquare />,
    key: 'chats',
  },
]

export type SortingType = 'default' | 'alphabetical' | 'date' | 'size'
export type Filters = { music: boolean }

export type View = 'grid' | 'column'
