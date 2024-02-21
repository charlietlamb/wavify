'use client'

import { setSpace } from '@/state/collective/collectiveSlice'
import { useCollective } from '@/state/collective/useCollective'
import { useAppSelector, useAppStore } from '@/state/hooks'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export function SpaceProvider({
  children,
  space,
  unique,
}: {
  children: React.ReactNode
  space: Space
  unique: string
}) {
  const { colUser } = useCollective()
  const store = useAppStore()
  const initialized = useRef(false)
  const storeSpace = useAppSelector((state) => state.collective.space)
  if (!initialized.current) {
    store.dispatch(setSpace(space))
    initialized.current = true
  } else {
    if (storeSpace && storeSpace.id !== space.id) {
      store.dispatch(setSpace(space))
    }
  }
  const router = useRouter()
  if (!space.open && !space.allowed.includes(colUser.roles?.id))
    router.push(`/collective/${unique}`)
  return <>{children}</>
}
