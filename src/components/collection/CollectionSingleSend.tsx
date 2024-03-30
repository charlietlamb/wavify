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
import { useCollectionContext } from './context/collectionContext'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { UserAvatar } from '../utils/UserAvatar'
import { getUserTargets } from '../resource/functions/getUserTargets'
import { sendCollectionToSpace } from './functions/sendCollectionToSpace'
import { sendCollectionToUser } from './functions/sendCollectionToUser'

export default function CollectionSingleSend({
  bottom = false,
}: {
  bottom?: boolean
}) {
  const supabase = createClientComponentClient()
  const { collection } = useCollectionContext()
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
      <Button
        variant="zinc_outline"
        onClick={() => setOpen(true)}
        className={bottom ? 'w-full' : ''}
      >
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
                      await sendCollectionToSpace(
                        supabase,
                        collection,
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
                      await sendCollectionToUser(
                        supabase,
                        collection,
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
