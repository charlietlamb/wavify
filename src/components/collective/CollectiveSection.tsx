'use client'

import { Plus, Settings } from 'lucide-react'
import { ActionTooltip } from '../util/ActionTooltip'
import { useModal } from '../../../hooks/use-modal-store'
import { useUser } from '@/state/user/useUser'
import { useCollective } from '@/state/collective/useCollective'

interface CollectiveSectionProps {
  label: string
  sectionType: 'spaces' | 'users'
  spaceType?: SpaceType
}

export default function CollectiveSection({
  label,
  sectionType,
  spaceType,
}: CollectiveSectionProps) {
  const user = useUser()
  const { collective, colUser, colUsers, roles, spaces } = useCollective()
  const { onOpen } = useModal()
  const canCreate = colUser?.roles?.canCreate || false
  const canMembers = colUser?.roles?.canMembers || false
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {canCreate && sectionType === 'spaces' && (
        <ActionTooltip label="Create Space" side="top">
          <button
            onClick={() =>
              onOpen('createSpace', { collective, spaceType, spaces, roles })
            }
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
      {canMembers && sectionType === 'users' && (
        <ActionTooltip label="Manage Users" side="top">
          <button
            onClick={() =>
              onOpen('members', { user, collective, colUsers, roles })
            }
            className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          >
            <Settings className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}
