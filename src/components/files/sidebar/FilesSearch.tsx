'use client'

import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { UserAvatar } from '@/components/utils/UserAvatar'
import downloadChatImage from '@/components/chat/actions/downloadFile'
import { useFilesContext } from '../state/context'

export default function FilesSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { searchFiles: files } = useFilesContext()
  useEffect(() => {
    const down = (e: KeyboardEvent): void => {
      if (e.key === 'k' && !e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const onClick = async (fileUrl: string, fileName: string) => {
    setOpen(false)
    const url = await downloadChatImage(fileUrl)
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
      >
        <Search className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
          Search
        </p>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all spaces and users" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {files.map(({ id, name, users, url }) => {
            return (
              <CommandItem
                key={id}
                onSelect={() => onClick(url, name)}
                className="m1 cursor-pointer hover:bg-background_content"
              >
                <UserAvatar
                  src="https://github.com/shadcn.png" //users.profile_pic_url
                  className="mr-2"
                ></UserAvatar>
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
