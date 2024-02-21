'use client'

import { Edit, Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ModalType, useModal } from '../../../hooks/use-modal-store'
import { ActionTooltip } from '../util/ActionTooltip'
import { iconMap, iconMapSidebar } from './space/data'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRoleUpdateEffect } from '../modals/hooks/useRoleUpdateEffect'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useCollective } from '@/state/collective/useCollective'

interface CollectiveSpaceProps {
  space: Space
}

export const CollectiveSpace = ({ space }: CollectiveSpaceProps) => {
  const { collective, roles, colUser, spaces } = useCollective()
  const { onOpen } = useModal()
  const params = useParams()
  const router = useRouter()
  const supabase = createClientComponentClient()
  const onClick = () => {
    router.push(`/collective/${params?.unique}/${space.slug}`)
  }
  const [rolesAndAllowed, setRolesAndAllowed] = useState<RoleAndAllowed[]>(
    roles.map((role) => ({ ...role, allowed: space.allowed.includes(role.id) }))
  )

  const rolesAndAllowedRef = useRef(rolesAndAllowed)
  useEffect(() => {
    rolesAndAllowedRef.current = rolesAndAllowed
  }, [rolesAndAllowed])

  const onAction = useCallback(
    (e: React.MouseEvent, action: ModalType) => {
      e.stopPropagation()
      onOpen(action, {
        space,
        collective,
        spaces,
        rolesAndAllowed: rolesAndAllowedRef.current,
      })
    },
    [onOpen, space, collective, spaces]
  )
  useRoleUpdateEffect(supabase, collective, rolesAndAllowed, setRolesAndAllowed)
  return (
    <button
      onClick={onClick}
      className={cn(
        'group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params?.spaceId === space.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      {iconMapSidebar[space?.type as keyof typeof iconMap]}
      <p
        className={cn(
          'line-clamp-1 text-left text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params?.spaceId === space.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {<>{space.name}</>}
      </p>
      {space.name !== 'general' && colUser.roles.canCreate && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => {
                onAction(e, 'editSpace')
              }}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, 'deleteSpace')}
              className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
            />
          </ActionTooltip>
        </div>
      )}
    </button>
  )
}
