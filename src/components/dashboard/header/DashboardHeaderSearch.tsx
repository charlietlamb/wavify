import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useUser } from '@/state/user/useUser'
import { Search } from 'lucide-react'
import { useState } from 'react'

export default function DashboardHeaderSearch() {
  const [open, setOpen] = useState(false)
  const user = useUser()

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex  w-full items-center gap-x-2 rounded-md border border-zinc-700 bg-black px-2 py-2 transition hover:border-zinc-200 "
      >
        <Search className="h-4 w-4 text-zinc-200" />
        <p className="hidden px-1 text-sm font-semibold text-zinc-400 transition group-hover:text-zinc-200 sm:flex">
          Search Dashboard
        </p>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all folders in library" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {/* {folders.map(({ id, name }) => {
            return (
              <CommandItem
                key={id}
                onSelect={() => {
                  addFolderToPostbox(supabase, user, space, id)
                  setOpen(false)
                }}
                className="m1 cursor-pointer gap-x-2 hover:bg-background_content"
              >
                <Folder className="min-h-6 min-w-6"></Folder>
                <span>{name}</span>
                <span className="hidden">{id}</span>
              </CommandItem>
            )
          })} */}
        </CommandList>
      </CommandDialog>
    </>
  )
}
