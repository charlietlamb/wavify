import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { HashIcon, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useResourceContext } from './context/resourceContext'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getUserTargets } from './functions/getUserTargets'
import sendResourceToSpace from './functions/sendResourceToSpace'
import sendResourceToUser from './functions/sendResourceToUser'
import { UserAvatar } from '../utils/UserAvatar'

export default function ResourceSingleSend() {
  const supabase = createClientComponentClient()
  const { resource } = useResourceContext()
  const user = useUser()
  const [open, setOpen] = useState(false)
  const [targets, setTargets] = useState<
    (User | (Space & { collectives: Collective }))[]
  >([])
  useEffect(() => {
    async function getData() {
      setTargets(await getUserTargets(supabase, user))
    }
    getData()
  }, [])
  return (
    <>
      <Button variant="zinc_outline" onClick={() => setOpen(true)}>
        <Send />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all friends/spaces" />
        <CommandList className="bg-zinc-950">
          <CommandEmpty>No Recipients Found.</CommandEmpty>
          {targets
            .filter(
              (
                target
              ): target is
                | (User & { isUser: boolean })
                | (Space & { collectives: Collective; isUser: boolean }) =>
                'isUser' in target
            )
            .map(
              (
                target:
                  | (User & { isUser: boolean })
                  | (Space & { collectives: Collective; isUser: boolean })
              ) => {
                return !target.isUser ? (
                  <CommandItem
                    key={target.id}
                    onSelect={async () => {
                      await sendResourceToSpace(
                        supabase,
                        resource,
                        target as Space,
                        user
                      )
                      setOpen(false)
                    }}
                    className="flex cursor-pointer gap-1 hover:bg-background_content"
                  >
                    <HashIcon />
                    {'collectives' in target && 'slug' in target && (
                      <span>{`${target.collectives.unique}/${target.slug}`}</span>
                    )}
                    <span className="hidden">{target.id}</span>
                  </CommandItem>
                ) : (
                  <CommandItem
                    key={target.id}
                    onSelect={async () => {
                      await sendResourceToUser(
                        supabase,
                        resource,
                        target as User,
                        user
                      )
                      setOpen(false)
                    }}
                    className="flex cursor-pointer gap-1 hover:bg-background_content"
                  >
                    <UserAvatar user={target as User} />
                    {'username' in target && <span>{target.username}</span>}
                    <span className="hidden">{target.id}</span>
                  </CommandItem>
                )
              }
            )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
