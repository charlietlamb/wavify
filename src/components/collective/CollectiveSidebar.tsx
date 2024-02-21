'use server'

import { Separator } from '../ui/separator'
import { CollectiveHeader } from './CollectiveHeader'
import { getSpaces } from './(sidebar)/(functions)/getSpaces'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getUserRole } from './(sidebar)/(functions)/getUserRole'
import CollectiveMemberMap from './CollectiveMemberMap'
import CollectiveSearchWrap from './CollectiveSearchWrap'
import CollectiveSpaces from './CollectiveSpaces'

export default async function CollectiveSidebar({
  user,
  collective,
  colUser,
  colUsers,
  roles,
  spaces,
}: {
  user: User
  collective: Collective
  colUser: ColUserAndData
  colUsers: ColUserAndData[]
  roles: Role[]
  spaces: Space[]
}) {
  const isFounder = user.id === collective.founder

  const filteredSpaces = isFounder
    ? spaces
    : spaces.filter(
        (space: Space) =>
          space.allowed.includes(colUser.roles?.id) || space.open
      )

  return (
    <div className="flex h-full flex-grow flex-col bg-background_content text-primary">
      <CollectiveHeader />
      <div className="flex flex-grow flex-col overflow-auto px-3">
        <CollectiveSearchWrap />
        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex h-full flex-grow flex-col overflow-y-auto">
          <CollectiveSpaces />
          <CollectiveMemberMap />
        </div>
      </div>
    </div>
  )
}
