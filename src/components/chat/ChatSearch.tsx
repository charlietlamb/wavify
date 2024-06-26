'use client'

import { ArrowBigUp, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import downloadChatImage from './actions/downloadFile'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import isObject from '@/lib/isObject'
import { UserAvatar } from '../utils/UserAvatar'
import { cn } from '@/lib/utils'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFileDataUpdateEffect } from './hooks/useFileDataUpdateEffect'

interface ChatSearchProps {
  chat: Chat
  searchData: (FileAndSender | null)[]
  className: string
}

export default function ChatSearch({
  chat,
  searchData,
  className,
}: ChatSearchProps) {
  const supabase = createClientComponentClient()
  const [open, setOpen] = useState(false)
  const initFileData = searchData.filter(isObject) as FileAndSender[]
  const [fileData, setFileData] = useState<FileAndSender[]>(initFileData)

  useFileDataUpdateEffect(supabase, chat, setFileData)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'f' && e.shiftKey && (e.metaKey || e.ctrlKey)) {
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
      <div className={className}>
        <button
          onClick={() => setOpen(true)}
          className={cn(
            'group flex w-full items-center gap-x-2 rounded-md border border-zinc-700 bg-transparent px-2 py-2 transition hover:border-zinc-200'
          )}
        >
          <Search className="min-h-4 min-w-4 text-zinc-500 dark:text-zinc-400" />
          <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
            Search
          </p>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center rounded border bg-transparent px-1.5 font-mono text-[10px] font-medium text-zinc-200">
            <div className="flex">
              <span className="text-xs">⌘</span>
              <ArrowBigUp strokeWidth={1.5} className="mt-[1px] h-3 w-auto" />
            </div>
            F
          </kbd>
        </button>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all files" />
        <CommandList className="bg-zinc-950">
          <CommandEmpty>No Files Found.</CommandEmpty>
          {fileData.map(({ id, name, users, url }) => {
            return (
              <CommandItem
                key={id}
                onSelect={() => onClick(url, name)}
                className="m1 cursor-pointer hover:bg-background_content"
              >
                <UserAvatar user={users} className="mr-2"></UserAvatar>
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
