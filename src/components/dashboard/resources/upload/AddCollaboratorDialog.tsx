import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { UserAvatar } from '@/components/utils/UserAvatar'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export default function AddCollaboratorDialog({
  addCollaborator,
  friends,
}: {
  addCollaborator: (user: User) => void
  friends: User[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-zinc-700 transition hover:bg-zinc-500">
        <PlusIcon onClick={() => setOpen(true)} className="text-zinc-200" />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all folders in library" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {friends.map((user: User) => {
            return (
              <CommandItem
                key={user.id}
                onSelect={() => {
                  addCollaborator(user)
                  setOpen(false)
                }}
                className="m1 cursor-pointer gap-x-2 hover:bg-background_content"
              >
                <UserAvatar user={user} />
                <span>{user.username}</span>
                <span className="hidden">{user.id}</span>
              </CommandItem>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
