import isObject from '@/lib/isObject'
import RoleItem from './RoleItem'
import { Accordion } from '../ui/accordion'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { handleDragEnd } from './roles/handleDragEnd'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { useCollective } from '@/state/collective/useCollective'
import { useAppDispatch } from '@/state/hooks'

export default function RolesMap() {
  const { roles, colUser } = useCollective()
  const dispatch = useAppDispatch()
  if (!Array.isArray(roles)) return null
  const [init, setInit] = useState(false)
  if (!init) {
    setInit(true)
  }
  return (
    <DragDropContext
      onDragEnd={(result) => handleDragEnd(result, roles, dispatch)}
    >
      <Accordion type="single" collapsible className="max-w-full space-y-2">
        <Droppable droppableId={'roles'}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                'max-h-full max-w-full overflow-clip rounded-md',
                snapshot.isDraggingOver && 'bg-secondary/5'
              )}
            >
              {Array.isArray(roles) &&
                roles.map((role: Role, index: number) => {
                  return (
                    (colUser.roles?.authority < role.authority ||
                      colUser.roles?.authority === 0) && (
                      <RoleItem role={role} key={role.id} index={index} />
                    )
                  )
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Accordion>
    </DragDropContext>
  )
}
