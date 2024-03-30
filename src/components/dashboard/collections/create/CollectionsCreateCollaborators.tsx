import { UserAvatar } from '@/components/utils/UserAvatar'
import { useUser } from '@/state/user/useUser'
import { ActionTooltip } from '@/components/util/ActionTooltip'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'
import AddCollaboratorDialog from '../../resources/upload/AddCollaboratorDialog'

export default function CollectionsCreateCollaborators() {
  const user = useUser()
  const { collaborators, setCollaborators } = useCollectionsCreateContext()
  const friends = [user, user, user, user]
  function addCollaborator(user: User) {
    if (collaborators.some((collaborator) => collaborator.id === user.id)) {
      setCollaborators(
        collaborators.filter((collaborator) => collaborator.id !== user.id)
      )
    } else {
      setCollaborators([...collaborators, user])
    }
  }
  return (
    <div className="flex gap-x-2">
      {friends.map((friend) => {
        return (
          <ActionTooltip label={friend.username}>
            <div
              key={friend.id}
              onClick={() => addCollaborator(friend)}
              className="relative cursor-pointer"
            >
              <UserAvatar user={user} />
              {collaborators.some(
                (collaborator) => collaborator.id === friend.id
              ) && (
                <div className="absolute bottom-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950">
                  <div className="h-2 w-2 rounded-full bg-zinc-200"></div>
                </div>
              )}
            </div>
          </ActionTooltip>
        )
      })}
      <AddCollaboratorDialog
        friends={friends}
        addCollaborator={addCollaborator}
      />
    </div>
  )
}
