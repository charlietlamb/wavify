'use client'

import { setUser } from '@/state/user/userSlice'
import { useDispatch } from 'react-redux'

export function UserProvider({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) {
  const dispatch = useDispatch()
  dispatch(setUser(user))

  return <>{children}</>
}
