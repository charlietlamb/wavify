import { useEffect, useState } from 'react'
import { useResourceContext } from './context/resourceContext'
import { getUserFromId } from '../files/functions/getUserFromId'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { UserAvatar } from '../utils/UserAvatar'
import { ActionTooltip } from '../util/ActionTooltip'

export default function ResourceSingleCollaborators() {
  const supabase = createClientComponentClient()
  const { resource } = useResourceContext()
  const [collaborators, setCollaborators] = useState<User[]>([])
  useEffect(() => {
    async function setData() {
      let userArray = []
      for (const collab of resource.collaborators) {
        const user1 = await getUserFromId(supabase, collab)
        userArray.push(user1)
      }
      setCollaborators(userArray)
    }
    setData()
  }, [])
  return (
    <div className="flex max-w-full flex-shrink-0 gap-2 overflow-x-auto">
      {collaborators.map((collab) => (
        <ActionTooltip label={collab.username} key={collab.id}>
          <UserAvatar user={collab} />
        </ActionTooltip>
      ))}
    </div>
  )
}
