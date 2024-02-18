import { Separator } from '../ui/separator'
import { CollectiveHeader } from './CollectiveHeader'
import CollectiveSection from './CollectiveSection'
import { CollectiveSpace } from './CollectiveSpace'
import { getSpaces } from './(sidebar)/(functions)/getSpaces'
import isObject from '@/lib/isObject'
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
  colSpaces,
}: {
  user: User
  collective: Collective
  colUser: ColUserAndData
  colUsers: ColUserAndData[]
  roles: Role[]
  colSpaces: Space[]
}) {
  const supabase = createServerComponentClient({ cookies })
  const userRole = await getUserRole(colUser, supabase)
  const spaces = await getSpaces(collective, supabase)
  const isFounder = user.id === collective.founder

  const filteredSpaces = isFounder
    ? spaces
    : spaces.filter(
        (space: Space) =>
          space.allowed.includes(colUser.roles?.id) || space.open
      )

  return (
    <div className="flex flex-grow flex-col bg-background_content text-primary">
      <CollectiveHeader
        collective={collective}
        colUser={colUser}
        user={user}
        userRole={userRole}
        colUsers={colUsers}
        roles={roles}
        spaces={colSpaces}
      />
      <div className="flex flex-grow flex-col px-3">
        <CollectiveSearchWrap
          collective={collective}
          spaces={filteredSpaces}
          colUsers={colUsers}
        ></CollectiveSearchWrap>
        <Separator className="my-2 rounded-md bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex flex-grow flex-col overflow-y-auto">
          <CollectiveSpaces
            initSpaces={filteredSpaces}
            user={user}
            collective={collective}
            colUser={colUser}
            colUsers={colUsers}
            roles={roles}
            userRole={userRole}
          />
          <CollectiveMemberMap
            user={user}
            collective={collective}
            initColUsers={colUsers}
            roles={roles}
          ></CollectiveMemberMap>
        </div>
      </div>
    </div>
  )
}
