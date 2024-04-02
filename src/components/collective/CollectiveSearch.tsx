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
import { useAppSelector } from '@/state/hooks'
import { cn } from '@/lib/utils'
import { RootState } from '@/state/store'

interface CollectiveSearchProps {
  data: SearchData
  small?: boolean
}

export default function CollectiveSearch({
  data,
  small,
}: CollectiveSearchProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const params = useParams()
  const { collective } = useAppSelector((state: RootState) => state.sidebar)
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
  const onClick = ({ id, type }: { id: string; type: 'space' | 'user' }) => {
    setOpen(false)
    if (type === 'user') {
      return router.push(`/user/${id}/chat`)
    }
    if (type === 'space') {
      return router.push(`/collective/${params?.unique}/${id}`)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'group flex items-center gap-x-2 p-2',
          collective && 'hidden'
        )}
      >
        <Search className="min-h-4 min-w-4 text-zinc-200" />
        {!small && (
          <>
            <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
              Search
            </p>
            <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </>
        )}
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all spaces and users" />
        <CommandList>
          <CommandEmpty>No Results found</CommandEmpty>
          {data.map(({ key, label, type, data }) => {
            if (!data?.length) return null

            return (
              <CommandGroup key={key} heading={label}>
                {data?.map(({ id, icon, name, color }) => {
                  return (
                    <CommandItem
                      key={key + id}
                      onSelect={() => onClick({ id, type })}
                    >
                      {icon}
                      <span className="ml-2" style={{ color: color }}>
                        {name}
                      </span>
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
