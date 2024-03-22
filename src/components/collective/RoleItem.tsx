import isObject from '@/lib/isObject'
import { Dispatch, SetStateAction, useState } from 'react'
import { AccordionTrigger, AccordionItem } from '../ui/accordion'
import { RoleContext } from './roles/context'
import RoleEdit from './RoleEdit'
import { Draggable } from '@hello-pangea/dnd'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCollective } from '@/state/collective/useCollective'

export default function RoleItem({
  role,
  index,
}: {
  role: Role
  index: number
}) {
  const { roles } = useCollective()
  const [emoji, setEmoji] = useState<string>(role.emoji ? role.emoji : '')
  const [name, setName] = useState<string>(role.name ? role.name : '')
  const [color, setColor] = useState<string>(role.color ? role.color : '')
  const [permissions, setPermissions] = useState<Json>({
    canInvite: typeof role.canInvite === 'boolean' ? role.canInvite : false,
    canCreate: typeof role.canCreate === 'boolean' ? role.canCreate : false,
    canDelete: typeof role.canDelete === 'boolean' ? role.canDelete : false,
    canMembers: typeof role.canMembers === 'boolean' ? role.canMembers : false,
    canSettings:
      typeof role.canSettings === 'boolean' ? role.canSettings : false,
    canRoles: typeof role.canRoles === 'boolean' ? role.canRoles : false,
    canMessages:
      typeof role.canMessages === 'boolean' ? role.canMessages : false,
  })

  const [loading, setLoading] = useState<boolean>(false)
  return (
    <Draggable draggableId={role.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={cn(
              'max-h-full max-w-full flex-grow rounded-md',
              snapshot.isDragging && 'bg-zinc-950'
            )}
          >
            <AccordionItem
              className={cn(
                'border-b border-zinc-700',
                index === roles.length - 1 && 'border-b-0'
              )}
              value={typeof role.id === 'string' ? role.id : ''}
            >
              <div className="px-4">
                <AccordionTrigger className="flex w-full items-center justify-between gap-x-4 py-0 hover:no-underline">
                  <div {...provided.dragHandleProps}>
                    <GripVertical className="cursor-grab active:cursor-grabbing"></GripVertical>
                  </div>
                  <div className="flex w-4 justify-center text-zinc-600">
                    {roles.findIndex(
                      (role1) => isObject(role1) && role1.id === role.id
                    ) + 1}
                  </div>
                  <div className="flex w-full flex-grow items-center justify-between py-2">
                    <div className="flex space-x-2 text-xl">
                      <div>
                        <span
                          className="no-underline"
                          role="img"
                          aria-label="emoji"
                        >
                          {emoji}
                        </span>
                      </div>
                      <div style={{ color: `${color}` }}>{name}</div>
                    </div>
                  </div>
                </AccordionTrigger>
              </div>
              <RoleContext.Provider
                value={{
                  role,
                  emoji,
                  setEmoji,
                  name,
                  setName,
                  permissions,
                  setPermissions,
                  loading,
                  setLoading,
                  color,
                  setColor,
                }}
              >
                <RoleEdit></RoleEdit>
              </RoleContext.Provider>
            </AccordionItem>
          </div>
        )
      }}
    </Draggable>
  )
}
