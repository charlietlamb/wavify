import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface UsersContext {
  users: User[]
  setUsers: Dispatch<SetStateAction<User[]>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const UsersContext = createContext<UsersContext | undefined>(undefined)

export function useUsersContext() {
  const context = useContext(UsersContext)
  if (!context) {
    throw new Error('useUsersContext must be used within a UsersProvider')
  }
  return context
}
