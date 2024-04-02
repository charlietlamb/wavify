'use client'

import { CollectiveMember } from './CollectiveMember'
import CollectiveSection from './CollectiveSection'
import { useCollective } from '@/state/collective/useCollective'

export default function CollectiveMemberMap() {
  const { colUsers } = useCollective()
  return (
    <div className="divide-y divide-zinc-700">
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
