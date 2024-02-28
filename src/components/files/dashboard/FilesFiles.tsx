'use client'

import { cn } from '@/lib/utils'
import { useFilesContext } from '../state/context'
import File from './File'
import Folder from './Folder'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { handleFileDragEnd } from '../functions/handleFileDragEnd'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import NoFiles from './NoFiles'

export default function FilesFiles() {
  const { files, folders, view } = useFilesContext()
  const supabase = createClientComponentClient()
  console.log(files)
  console.log(folders)
  return (
    <div className="flex min-h-full flex-col overflow-y-auto">
      {files.length + folders.length > 0 ? (
        <DragDropContext
          onDragEnd={(result) =>
            handleFileDragEnd(result, files, folders, supabase)
          }
        >
          <Droppable droppableId="main" isDropDisabled>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
                  view === 'column' &&
                    'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1'
                )}
                style={{ transform: 'none' }}
              >
                {folders.map((folder, index) => (
                  <Droppable droppableId={folder.id} key={folder.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                          'h-full w-full',
                          snapshot.isDraggingOver && 'animate-pulse'
                        )}
                        style={{ transform: 'none' }}
                      >
                        <Draggable draggableId={folder.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-full"
                              style={
                                snapshot.isDragging
                                  ? {
                                      position: 'fixed',
                                      top: 0,
                                      left: 0,
                                      ...provided.draggableProps.style,
                                    }
                                  : { transform: 'none' }
                              }
                            >
                              <Folder folder={folder} />
                            </div>
                          )}
                        </Draggable>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
                {files.map((file, index) => (
                  <Draggable key={file.id} draggableId={file.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="h-full w-full"
                        style={
                          snapshot.isDragging
                            ? {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                ...provided.draggableProps.style,
                              }
                            : { transform: 'none' }
                        }
                      >
                        <File file={file} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <NoFiles />
      )}
    </div>
  )
}
