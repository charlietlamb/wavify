import isObject from '@/lib/isObject'
import { DropResult } from '@hello-pangea/dnd'
import { setSpaces } from '@/state/collective/collectiveSlice'
import { Dispatch } from '@reduxjs/toolkit'
import { saveSpacesBackground } from './saveSpacesBackground'

export function handleSpaceDragEnd(
  result: DropResult,
  spaces: Space[],
  dispatch: Dispatch,
  type: string
) {
  const { destination, source, draggableId } = result
  if (!destination) return
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return
  const updatedSpace = spaces.find((space) => space.id === draggableId)
  if (!isObject(updatedSpace)) return
  const newOrder = destination.index
  const spaceTypeToUpdate = spaces.filter((space) => space.type === type)
  const spacesTypeUpdated = spaceTypeToUpdate
    .filter((space) => space.id !== draggableId)
    .sort((a, b) => a.order - b.order)
  spacesTypeUpdated.splice(newOrder, 0, updatedSpace)
  const spacesToUpdate = spaces.map((space) => {
    if (space.type !== type) return space
    const space1 = spacesTypeUpdated.find((s) => s.id === space.id)
    return {
      ...space1,
      order: spacesTypeUpdated.indexOf(space),
    }
  }) as Space[]
  dispatch(setSpaces(spacesToUpdate))
  saveSpacesBackground(spacesTypeUpdated)
}
