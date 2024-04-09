import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Folder, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getUserFolders } from './functions/getUserFolders'
import { useUser } from '@/state/user/useUser'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { addFolderToPostbox } from './functions/addFolderToPostbox'
import { useFilesContext } from '../state/context'

export default function PostboxSend() {
  const [open, setOpen] = useState(false)
  const user = useUser()
  const supabase = createClientComponentClient()
  const { space } = useFilesContext()
  const [folders, setFolders] = useState<FolderAndSender[]>([])
  useEffect(() => {
    getUserFolders(supabase, user, setFolders)
  }, [open])
  if (!space) return

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-x-2 bg-black px-2 py-2 transition hover:border-zinc-200"
      >
        <Search className="h-4 w-4 text-zinc-200" />
        <p className="text-sm font-semibold text-zinc-200 transition ">
          Import Folder From Library...
        </p>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all folders in library" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {folders.map(({ id, name }) => {
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
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
