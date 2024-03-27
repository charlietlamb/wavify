'use client'

import {
  Bookmark,
  BookmarkCheck,
  BookmarkMinus,
  Edit,
  GripVertical,
  Trash,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ModalType, useModal } from '../../../hooks/use-modal-store'
import { ActionTooltip } from '../util/ActionTooltip'
import { iconMap, iconMapSidebar } from './space/data'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useCollective } from '@/state/collective/useCollective'
import { Draggable } from '@hello-pangea/dnd'
import { useUtils } from '@/state/util/useUtils'
import { useAppDispatch } from '@/state/hooks'
import { useUser } from '@/state/user/useUser'
import { useSpace } from '@/state/space/useSpace'
import { setSaved } from '@/state/space/spaceSlice'
import { toast } from 'sonner'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { unsaveSpace } from './functions/unsaveSpace'
import { saveSpace } from './functions/saveSpace'
import { userHasSavedSpace } from '@/app/collective/[unique]/[space_slug]/functions/userHasSavedSpace'

interface CollectiveSpaceProps {
  space: Space
  index: number
}

export const CollectiveSpace = ({ space, index }: CollectiveSpaceProps) => {
  const user = useUser()
  const supabase = createClientComponentClient()
  const { collective, roles, colUser, spaces } = useCollective()
  const { onOpen } = useModal()
  const [spaceSaved, setSpaceSaved] = useState(false)
  const params = useParams()
  const router = useRouter()
  const { spaceDrag, spaceDragType } = useUtils()
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
  useEffect(() => {
    async function getData() {
      setSpaceSaved(await userHasSavedSpace(supabase, user, space))
    }
    getData()
  }, [])
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
  async function handleSaveSpace(e: React.MouseEvent) {
    e.stopPropagation()
    if (spaceSaved) {
      await unsaveSpace(supabase, user, space)
      setSpaceSaved(false)
      toast('Unsaved successful', {
        description: 'This space has been removed from your saves',
        icon: <BookmarkMinus />,
      })
    } else {
      await saveSpace(supabase, user, space)
      setSpaceSaved(true)
      toast('Saved successful', {
        description: 'This space has been added to your saves',
        icon: <BookmarkCheck />,
      })
    }
  }
  return (
    <Draggable draggableId={space.id} index={index}>
      {(provided, snapshot) => (
        <button
          onClick={onClick}
          className={cn(
            'group mb-1 flex w-full items-center gap-x-2 rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
            params?.spaceId === space.id && 'bg-zinc-700/20 dark:bg-zinc-700'
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex gap-x-2">
            <div {...provided.dragHandleProps}>
              <GripVertical
                className={cn(
                  'h-4 w-0 cursor-grab text-zinc-200 active:cursor-grabbing',
                  spaceDrag && spaceDragType === space.type && 'w-4'
                )}
              ></GripVertical>
            </div>
            {iconMapSidebar[space?.type as keyof typeof iconMap]}
          </div>
          <p
            className={cn(
              'line-clamp-1 text-left text-sm font-semibold  text-zinc-200 transition group-hover:text-zinc-600 dark:group-hover:text-zinc-200',
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
              <ActionTooltip label={spaceSaved ? 'Unsave' : 'Save'}>
                <Bookmark
                  onClick={(e) => handleSaveSpace(e)}
                  className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
                />
              </ActionTooltip>
            </div>
          )}
        </button>
      )}
    </Draggable>
  )
}
