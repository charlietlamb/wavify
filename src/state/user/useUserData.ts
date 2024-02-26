import { useAppDispatch } from '../hooks'
import { RootState } from '../store'
import { useSelector } from 'react-redux'
import { setCollectives } from './userSlice'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUserCollectivesDispatchEffect } from './hooks/useUserCollectivesDispatchEffect'

interface UserData {
  user: User
  collectives: Collective[]
}

export function useUserData() {
  const supabase = createClientComponentClient()
  const { user, collectives } = useSelector((state: RootState) => state.user)
  const dispatch = useAppDispatch()
  if (!user) throw new Error('No user found')
  if (!collectives) throw new Error('No collectives found')

  function updateCollectives(collectives: Collective[]) {
    dispatch(setCollectives(collectives))
  }
  useUserCollectivesDispatchEffect(supabase, user, updateCollectives)
  return { user, collectives } as unknown as UserData
}
