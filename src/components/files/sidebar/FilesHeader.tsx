'use client'
import {
  Award,
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { useUser } from '@/state/user/useUser'
import { useModal } from '../../../../hooks/use-modal-store'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { cn } from '@/lib/utils'

export function FilesHeader() {
  const user = useUser()
  const { onOpen } = useModal()
  const router = useRouter()
  const { files } = useAppSelector((state: RootState) => state.sidebar)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          className={cn(
            'text-md flex h-12 flex-shrink-0 items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50',
            files && 'hidden'
          )}
        >
          Files
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        <DropdownMenuItem
          onClick={() => onOpen('invite')}
          className="px-3 py-2 text-sm text-primary"
        >
          Invite People
          <UserPlus className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen('editCollective')}
          className="cursor-pointer px-3 py-2 text-sm"
        >
          Collective Settings
          <Settings className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen('members')}
          className="cursor-pointer px-3 py-2 text-sm"
        >
          Manage Members
          <Users className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen('createSpace')}
          className="cursor-pointer px-3 py-2 text-sm"
        >
          Create Space
          <PlusCircle className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onOpen('deleteCollective')}
          className="cursor-pointer px-3 py-2 text-sm text-rose-500"
        >
          Delete Collective
          <Trash className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen('leaveCollective')}
          className="cursor-pointer px-3 py-2 text-sm text-rose-500"
        >
          Leave Collective
          <LogOut className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
