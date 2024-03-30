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
import { useResourceContext } from './context/resourceContext'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { addResourceToCollection } from './functions/addResourceToCollection'
import { getResourceCollections } from './functions/getResourceCollections'

export default function ResourceSingleCollection() {
  const supabase = createClientComponentClient()
  const { resource } = useResourceContext()
  const user = useUser()
  const [open, setOpen] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  useEffect(() => {
    async function getData() {
      setCollections(await getResourceCollections(supabase, resource, user))
    }
    getData()
  }, [])
  return (
    <>
      <Button variant="zinc_outline" onClick={() => setOpen(true)}>
        <Plus />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all collections" />
        <CommandList className="bg-zinc-950">
          <CommandEmpty>No Collections Found.</CommandEmpty>
          {collections.map((collection: Collection) => {
            return (
              <CommandItem
                key={collection.id}
                onSelect={async () => {
                  await addResourceToCollection(
                    supabase,
                    resource,
                    collection,
                    user
                  )
                  setCollections(
                    await getResourceCollections(supabase, resource, user)
                  )
                }}
                className="m1 cursor-pointer hover:bg-background_content"
              >
                <span>{collection.name}</span>
                <span className="hidden">{collection.id}</span>
              </CommandItem>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
