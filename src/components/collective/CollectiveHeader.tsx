'use client'
import {
  Award,
  Boxes,
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
            'text-md flex flex-shrink-0 flex-grow items-center justify-start gap-x-1 rounded-md border border-zinc-700 bg-transparent px-3 py-0 font-semibold text-zinc-200 transition hover:border-zinc-200',
            collectiveToggle && 'hidden'
          )}
        >
          <Boxes className="min-size-3"></Boxes>
          {collective.unique}
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
