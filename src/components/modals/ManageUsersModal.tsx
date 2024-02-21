'use client'
import { Check, Gavel, Loader2, MoreVertical } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import { useModal } from '../../../hooks/use-modal-store'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { AvatarDemo } from '../me/Avatar'
import { updateColUserRole } from './functions/updateColUserRole'
import { useColUserUpdateEffect } from '../collective/hooks/useColUserUpdateEffect'
import { handleKick } from './functions/handleKick'

export const MembersModal = () => {
  const router = useRouter()
  const { onOpen, isOpen, onClose, type, data } = useModal()
  const [loadingId, setLoadingId] = useState('')
  const supabase = createClientComponentClient()
  const isModalOpen = isOpen && type === 'members'
  const {
    user,
    collective: initCollective,
    colUsers: initColUsers,
    roles,
  } = data as {
    user: User
    collective: Collective
    colUsers: ColUserAndData[]
    roles: Role[]
  }
  const [colUsers, setColUsers] = useState<ColUserAndData[]>([])
  const [collective, setCollective] = useState<Collective>(initCollective)

  useEffect(() => {
    setColUsers(initColUsers)
    setCollective(initCollective)
  }, [isOpen])

  useColUserUpdateEffect(
    supabase,
    colUsers,
    setColUsers,
    collective,
    '_memberModal'
  )
  if (!collective) return
  const onKick = async (colUser: ColUserAndData) => {
    setLoadingId(colUser.id)
    try {
      const newColUsers = await handleKick(
        supabase,
        colUser,
        colUsers,
        collective
      )
      router.refresh()
      onOpen('members', { user, collective, colUsers: newColUsers, roles })
    } catch (error) {
      throw error
    } finally {
      setLoadingId('')
    }
  }

  const onRoleChange = async (colUser: ColUserAndData, role: Role) => {
    setLoadingId(colUser.id)
    try {
      const toUpdate = await updateColUserRole(supabase, colUser, role)
      const newColUsers = colUsers.map((colUser: ColUserAndData) =>
        colUser.id === toUpdate.id
          ? { ...toUpdate, users: colUser.users, roles: colUser.roles }
          : colUser
      )
      router.refresh()
      onOpen('members', { user, collective, colUsers: newColUsers, roles })
    } catch (error) {
      throw new Error(String(error))
    } finally {
      setLoadingId('')
    }
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden">
        <DialogHeader className="flex justify-start px-2">
          <DialogTitle className="text-left text-2xl font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-left text-zinc-500">
            {colUsers?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-2 max-h-[420px] px-2">
          {colUsers?.map((colUser: ColUserAndData) => {
            return (
              <div key={colUser.id} className="mb-6 flex items-center gap-x-1">
                <AvatarDemo src="https://github.com/shadcn.png" />
                <div className="flex flex-col gap-y-1">
                  <div className="flex items-center gap-x-1 text-xs font-semibold">
                    <p
                      className="ml-1 text-lg"
                      style={{ color: colUser.roles?.color }}
                    >
                      {colUser.users?.username}
                    </p>
                    {colUser.roles?.emoji}
                  </div>
                </div>
                {collective.founder !== colUser.users?.id &&
                  loadingId !== colUser.id && (
                    <div className="ml-auto">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreVertical className="h-4 w-4 text-zinc-500" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="left">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="flex items-center">
                              {colUser.roles?.emoji}
                              <span className="ml-2">Role</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {roles?.map((role) => {
                                  return (
                                    <DropdownMenuItem
                                      key={role.id}
                                      onClick={() =>
                                        onRoleChange(colUser, role)
                                      }
                                    >
                                      {role.emoji}

                                      <p
                                        className="ml-2"
                                        style={{ color: role.color }}
                                      >
                                        {role.name}
                                      </p>

                                      {colUser.role === role.name && (
                                        <Check className="ml-auto h-4 w-4" />
                                      )}
                                    </DropdownMenuItem>
                                  )
                                })}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onKick(colUser)}>
                            <Gavel className="mr-2 h-4 w-4" />
                            Kick
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                {loadingId === colUser.id && (
                  <Loader2 className="ml-auto h-4 w-4 animate-spin text-zinc-500" />
                )}
              </div>
            )
          })}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
