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
import { useModal } from '../../../hooks/use-modal-store'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useHeaderChangeEffect } from './(header)/(hooks)/useHeaderChangeEffect'
import { useUser } from '@/state/user/useUser'
import { useCollective } from '@/state/collective/useCollective'
import { useAppSelector } from '@/state/hooks'
import { RootState } from '@/state/store'
import { cn } from '@/lib/utils'

export const CollectiveHeader = () => {
  const user = useUser()
  const { collective, colUser } = useCollective()
  const supabase = createClientComponentClient()
  const { onOpen } = useModal()
  const router = useRouter()
  function redirectToRoles(collective: Collective) {
    router.push(`/collective/${collective.unique}/roles`)
  }
  const isFounder = collective.founder === colUser.users?.id
  useHeaderChangeEffect(supabase, user, collective, router)
  const { collective: collectiveToggle } = useAppSelector(
    (state: RootState) => state.sidebar
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          className={cn(
            'text-md flex h-12 flex-shrink-0 items-center border-b-2 border-neutral-200 px-3 font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50',
            collectiveToggle && 'hidden'
          )}
        >
          {collective.unique}
          <ChevronDown className="ml-auto h-5 w-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-[2px] text-xs font-medium text-black dark:text-neutral-400">
        {(isFounder || colUser.roles.canInvite) && (
          <DropdownMenuItem
            onClick={() => onOpen('invite')}
            className="px-3 py-2 text-sm text-primary"
          >
            Invite People
            <UserPlus className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {(isFounder || colUser.roles.canSettings) && (
          <DropdownMenuItem
            onClick={() => onOpen('editCollective')}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Collective Settings
            <Settings className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {(isFounder || colUser.roles.canRoles) && (
          <DropdownMenuItem
            onClick={() => redirectToRoles(collective)}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Manage Roles
            <Award className="ml-auto h-4 w-4"></Award>
          </DropdownMenuItem>
        )}
        {(isFounder || colUser.roles.canMembers) && (
          <DropdownMenuItem
            onClick={() => onOpen('members')}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Manage Members
            <Users className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {(isFounder || colUser.roles.canCreate) && (
          <DropdownMenuItem
            onClick={() => onOpen('createSpace')}
            className="cursor-pointer px-3 py-2 text-sm"
          >
            Create Space
            <PlusCircle className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {isFounder && (
          <DropdownMenuItem
            onClick={() => onOpen('deleteCollective')}
            className="cursor-pointer px-3 py-2 text-sm text-rose-500"
          >
            Delete Collective
            <Trash className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
        {!isFounder && (
          <DropdownMenuItem
            onClick={() => onOpen('leaveCollective')}
            className="cursor-pointer px-3 py-2 text-sm text-rose-500"
          >
            Leave Collective
            <LogOut className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
