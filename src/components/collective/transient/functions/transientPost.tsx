import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Folder, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { postToTransient } from './postToTransient'
import { Button } from '@/components/ui/button'
import { getScheduleFolders } from './getScheduleFolders'

export default function TransientPost({
  spaceProp,
  scheduleProp,
}: {
  spaceProp: Space
  scheduleProp: Schedule
}) {
  const [open, setOpen] = useState(false)
  const user = useUser()
  const supabase = createClientComponentClient()
  const [space, setSpace] = useState<Space>(spaceProp)
  const [schedule, setSchedule] = useState<Schedule>(scheduleProp)
  const [folders, setFolders] = useState<FolderAndSender[]>([])
  useEffect(() => {
    getScheduleFolders(supabase, scheduleProp, user, setFolders)
    setSpace(spaceProp)
    setSchedule(scheduleProp)
  }, [open])
  if (!space) return

  return (
    <>
      <Button
        variant={'outline'}
        className="w-full justify-start text-left font-normal"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <p>Post To Transient...</p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all folders in library" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {folders.map(({ id, name }) => {
            return (
              <CommandItem
                key={id}
                onSelect={() => {
                  postToTransient(supabase, user, space, id, schedule)
                  setOpen(false)
                }}
                className="m1 cursor-pointer gap-x-2 hover:bg-background_content"
              >
                <Folder className="min-h-6 min-w-6"></Folder>
                <span>{name}</span>
                <span className="hidden">{id}</span>
              </CommandItem>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
