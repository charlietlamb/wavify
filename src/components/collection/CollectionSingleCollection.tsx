import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useCollectionContext } from './context/collectionContext'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getCollectionCollections } from './functions/getCollectionCollections'
import { addCollectionToCollection } from './functions/addCollectionToCollection'

export default function CollectionSingleCollection({
  bottom = false,
}: {
  bottom?: boolean
}) {
  const supabase = createClientComponentClient()
  const { collection } = useCollectionContext()
  const user = useUser()
  const [open, setOpen] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  useEffect(() => {
    async function getData() {
      setCollections(await getCollectionCollections(supabase, collection, user))
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
        <Plus />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all collections" />
        <CommandList className="bg-zinc-950">
          <CommandEmpty>No Collections Found.</CommandEmpty>
          {collections.map((collectionNew: Collection) => {
            return (
              <CommandItem
                key={collection.id}
                onSelect={async () => {
                  await addCollectionToCollection(
                    supabase,
                    collectionNew,
                    collection,
                    user
                  )
                  setCollections(
                    await getCollectionCollections(
                      supabase,
                      collectionNew,
                      user
                    )
                  )
                }}
                className="m1 cursor-pointer hover:bg-background_content"
              >
                <span>{collectionNew.name}</span>
                <span className="hidden">{collectionNew.id}</span>
              </CommandItem>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
