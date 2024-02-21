import { RootState } from '../store'
import { useSelector } from 'react-redux'

export function useUser() {
  const { user } = useSelector((state: RootState) => state.user)
  if (!user) throw new Error('No user found')
  return user
}
