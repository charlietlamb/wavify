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
import { useFilesContext } from '@/components/files/state/context'
import { getUserFolders } from '@/components/files/postbox/functions/getUserFolders'
import { postToTransient } from './postToTransient'

export default function TransientPost() {
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
        className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
      >
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Post To Transient...
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
                  postToTransient(supabase, user, space, id)
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
