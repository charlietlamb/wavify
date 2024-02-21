'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@/state/store'
import { setUser } from '@/state/user/userSlice'

export default function StoreProvider({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    storeRef.current.dispatch(setUser(user))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
