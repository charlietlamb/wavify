'use client'

import { useEffect, useState } from 'react'
import CollectiveSection from './CollectiveSection'
import { CollectiveSpace } from './CollectiveSpace'
import { spaceTypes, spaceLabels } from './space/data'
import { useSpacesUpdateEffect } from './hooks/useSpacesUpdateEffect'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCollective } from '@/state/collective/useCollective'

export default function CollectiveSpaces() {
  const { spaces, collective, colUser, colUsers, roles } = useCollective()
  //TODO
  //useSpacesUpdateEffect(supabase, spaces, setSpaces, collective)
  return (
    <>
      {spaceTypes.map(
        (spaceType: string, index: number) =>
          spaces.some((space) => space.type === spaceType) && (
            <div className="mb-2" key={spaceType}>
              <CollectiveSection
                sectionType="spaces"
                spaceType={spaceType as SpaceType}
                label={spaceLabels[index]}
              />
              <div className="space-y-[2px]">
                {spaces.map((space: Space) => {
                  if (space.type !== spaceType) return null
                  return <CollectiveSpace key={space.id} space={space} />
                })}
              </div>
            </div>
          )
      )}
    </>
  )
}
