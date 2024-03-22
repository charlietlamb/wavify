import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { UserMode } from '../data/data'

interface UserContext {
  otherUser: User
  mode: UserMode
  setMode: Dispatch<SetStateAction<UserMode>>
  following: number
  setFollowing: Dispatch<SetStateAction<number>>
  followers: number
  setFollowers: Dispatch<SetStateAction<number>>
  isFollowing: boolean
  setIsFollowing: Dispatch<SetStateAction<boolean>>
}

export const UserContext = createContext<UserContext | undefined>(undefined)

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
