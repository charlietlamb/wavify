'use client'

import { useState } from 'react'
import CollectiveSection from './CollectiveSection'
import { CollectiveSpace } from './CollectiveSpace'
import { spaceTypes, spaceLabels } from './space/data'
import { useSpacesUpdateEffect } from './hooks/useSpacesUpdateEffect'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface CollectiveSpacesProps {
  initSpaces: Space[]
  user: User
  collective: Collective
  colUser: ColUserAndData
  colUsers: ColUserAndData[]
  roles: Role[]
  userRole: Role
}

export default function CollectiveSpaces({
  initSpaces,
  user,
  collective,
  colUser,
  colUsers,
  roles,
  userRole,
}: CollectiveSpacesProps) {
  const supabase = createClientComponentClient()
  const [spaces, setSpaces] = useState<Space[]>(initSpaces)
  useSpacesUpdateEffect(
    supabase,
    userRole,
    spaces,
    setSpaces,
    collective,
    collective.founder === user.id
  )
  return (
    <>
      {spaceTypes.map(
        (spaceType: string, index: number) =>
          spaces.some((space) => space.type === spaceType) && (
            <div className="mb-2" key={spaceType}>
              <CollectiveSection
                sectionType="spaces"
                spaceType={spaceType as SpaceType}
                user={user}
                collective={collective}
                label={spaceLabels[index]}
                colUser={colUser}
                colUsers={colUsers}
                roles={roles}
              />
              <div className="space-y-[2px]">
                {spaces.map((space: Space) => {
                  if (space.type !== spaceType) return null
                  return (
                    <CollectiveSpace
                      key={space.id}
                      space={space}
                      collective={collective}
                      userRole={userRole}
                      spaces={spaces}
                      roles={roles}
                    />
                  )
                })}
              </div>
            </div>
          )
      )}
    </>
  )
}
