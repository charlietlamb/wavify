'use client'

import { useEffect, useState } from 'react'
import { CollectiveMember } from './CollectiveMember'
import CollectiveSection from './CollectiveSection'
import { useColUserUpdateEffect } from './hooks/useColUserUpdateEffect'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { useUser } from '@/state/user/useUser'
import { useCollective } from '@/state/collective/useCollective'

export default function CollectiveMemberMap() {
  const user = useUser()
  const { colUsers } = useCollective()
  //TODO
  // const supabase = createClientComponentClient()
  // const [colUsers, setColUsers] = useState<ColUserAndData[]>(initColUsers)
  // const [colUser, setColUser] = useState<ColUserAndData | null>(null)
  // useColUserUpdateEffect(
  //   supabase,
  //   colUsers,
  //   setColUsers,
  //   collective,
  //   '_memberMap'
  // )
  // useEffect(() => {
  //   const newColUser = colUsers.find((colUser) => colUser.users?.id === user.id)
  //   if (!newColUser) redirect('/')
  //   setColUser(newColUser)
  // }, [colUsers])
  return (
    <div className="mb-2">
      <CollectiveSection sectionType="users" label="Members" />
      <div className="space-y-[2px]">
        {colUsers.map((colUser1) => {
          return (
            <CollectiveMember key={colUser1?.id} colUserAndData={colUser1} />
          )
        })}
      </div>
    </div>
  )
}
