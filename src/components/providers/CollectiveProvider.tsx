'use client'

import {
  setColUser,
  setColUsers,
  setCollective,
  setRoles,
  setSpaces,
} from '@/state/collective/collectiveSlice'
import { useColUserDispatchEffect } from '@/state/collective/hooks/useColUserDispatchEffect'
import { useCollectiveDispatchEffect } from '@/state/collective/hooks/useCollectiveDispatchEffect'
import { useRolesDispatchEffect } from '@/state/collective/hooks/useRolesDispatchEffect'
import { useSpacesDispatchEffect } from '@/state/collective/hooks/useSpacesDispatchEffect'
import { useAppStore } from '@/state/hooks'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export function CollectiveProvider({
  children,
  collective,
  colUser,
  colUsers,
  roles,
  spaces,
}: {
  children: React.ReactNode
  collective: Collective
  colUser: ColUserAndData
  colUsers: ColUserAndData[]
  roles: Role[]
  spaces: Space[]
}) {
  const store = useAppStore()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(setCollective(collective))
    store.dispatch(setColUser(colUser))
    store.dispatch(setColUsers(colUsers))
    store.dispatch(setSpaces(spaces))
    store.dispatch(setRoles(roles))
    initialized.current = true
  }

  function updateCollective(collective: Collective | 'DELETED') {
    if (collective === 'DELETED') {
      router.push('/')
    } else {
      store.dispatch(setCollective(collective))
    }
  }

  function updateColUsers(
    colUsers: ColUserAndData[],
    colUser?: ColUserAndData | 'DELETED'
  ) {
    if (colUser && colUser !== 'DELETED') {
      store.dispatch(setColUser(colUser))
    }
    if (colUser === 'DELETED') {
      router.push('/')
    }
    store.dispatch(setColUsers(colUsers))
  }

  function updateSpaces(spaces: Space[]) {
    store.dispatch(setSpaces(spaces))
  }
  useCollectiveDispatchEffect(supabase, collective, updateCollective)
  useSpacesDispatchEffect(supabase, spaces, updateSpaces, collective)
  useColUserDispatchEffect(
    supabase,
    colUser,
    colUsers,
    updateColUsers,
    collective
  )
  useRolesDispatchEffect(supabase, roles, setRoles, collective)

  return <>{children}</>
}
