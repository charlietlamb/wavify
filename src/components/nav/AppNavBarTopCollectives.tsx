'use client'

import { useState } from 'react'
import { NavigationItem } from './NavItem'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUserCollectivesUpdateEffect } from './hooks/useUserCollectivesUpdateEffect'
import { useGetCollectivesOnRefreshEffect } from './hooks/useGetCollectivesOnRefreshEffect'
import { cn } from '@/lib/utils'
import { useUser } from '@/state/user/useUser'

export default function AppNavBarTopCollectives({
  collectives: initCollectives,
  className,
}: {
  collectives: Collective[]
  className?: string
}) {
  const user = useUser()
  const supabase = createClientComponentClient()
  const [collectives, setCollectives] = useState(initCollectives)
  useGetCollectivesOnRefreshEffect(supabase, user, setCollectives)
  useUserCollectivesUpdateEffect(
    supabase,
    collectives,
    setCollectives,
    user,
    'navbar'
  )

  return !!collectives.length ? (
    collectives.map((collective: Collective) => (
      <div key={collective.id} className={cn('mr-1', className && className)}>
        <NavigationItem collective={collective} />
      </div>
    ))
  ) : (
    <div>no collectives</div>
  )
}
