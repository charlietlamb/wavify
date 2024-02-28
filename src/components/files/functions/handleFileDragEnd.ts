import { DropResult } from '@hello-pangea/dnd'
import { updateFileOnDrag } from './updateFileOnDrag'
import { updateFolderOnDrag } from './updateFolderOnDrag'

export function handleFileDragEnd(
  result: DropResult,
  files: FileAndSender[],
  folders: FolderAndSender[],
  supabase: Supabase
) {
  const { destination, source, draggableId } = result
  if (!destination) return
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return
  if (files.some((file) => file.id === draggableId)) {
    updateFileOnDrag(supabase, draggableId, destination.droppableId)
  } else if (folders.some((folder) => folder.id === draggableId)) {
    updateFolderOnDrag(supabase, draggableId, destination.droppableId)
  }
}
