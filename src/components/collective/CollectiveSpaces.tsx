'use client'

import { useUser } from '@/state/user/useUser'
import CollectiveSection from './CollectiveSection'
import { CollectiveSpace } from './CollectiveSpace'
import { spaceTypes, spaceLabels } from './space/data'
import { useCollective } from '@/state/collective/useCollective'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { handleSpaceDragEnd } from './space/handleSpaceDragEnd'
import { useAppDispatch } from '@/state/hooks'
import { cn } from '@/lib/utils'
import { useUtils } from '@/state/util/useUtils'

export default function CollectiveSpaces() {
  const user = useUser()
  const dispatch = useAppDispatch()
  const { spaces, collective, colUser } = useCollective()
  const { spaceDragType } = useUtils()
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>(
    collective.founder === user.id
      ? spaces
      : spaces.filter(
          (space: Space) =>
            space.allowed.includes(colUser.roles?.id) || space.open
        )
  )
  useEffect(() => {
    setFilteredSpaces(
      collective.founder === user.id
        ? spaces
        : spaces.filter(
            (space: Space) =>
              space.allowed.includes(colUser.roles?.id) || space.open
          )
    )
  }, [spaces])
  return (
    <>
      {spaceTypes.map(
        (spaceType: string, typeIndex: number) =>
          filteredSpaces.some((space) => space.type === spaceType) && (
            <div className="divide-y divide-zinc-700" key={spaceType}>
              <CollectiveSection
                sectionType="spaces"
                spaceType={spaceType as SpaceType}
                label={spaceLabels[typeIndex]}
              />
              <DragDropContext
                onDragEnd={(result) =>
                  handleSpaceDragEnd(
                    result,
                    filteredSpaces,
                    dispatch,
                    spaceDragType
                  )
                }
              >
                <Droppable droppableId="spaces">
                  {(provided) => {
                    let spaceIndex = -1
                    const filterSpaces = [...filteredSpaces].filter(
                      (space: Space) => space.type === spaceType
                    )

                    const filteredAndOrderedSpaces = filterSpaces.sort(
                      (a, b) => a.order - b.order
                    )
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn('space-y-[2px]')}
                      >
                        {filteredAndOrderedSpaces.map(
                          (space: Space, index: number) => {
                            if (space.type !== spaceType) return null
                            spaceIndex += 1
                            return (
                              <CollectiveSpace
                                key={space.id}
                                space={space}
                                index={index}
                              />
                            )
                          }
                        )}
                        {provided.placeholder}
                      </div>
                    )
                  }}
                </Droppable>
              </DragDropContext>
            </div>
          )
      )}
    </>
  )
}
