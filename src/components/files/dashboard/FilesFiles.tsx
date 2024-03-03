'use client'

import { cn } from '@/lib/utils'
import { useFilesContext } from '../state/context'
import File from './File'
import Folder from './Folder'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { handleFileDragEnd } from '../functions/handleFileDragEnd'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import NoFiles from './NoFiles'
import NoPost from './NoPost'
import { AnimatePresence, motion } from 'framer-motion'

export default function FilesFiles() {
  const { files, folders, view, postbox } = useFilesContext()
  const supabase = createClientComponentClient()
  return (
    <div className="flex flex-grow flex-col overflow-y-auto">
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
                  'grid grid-cols-1 items-start gap-4 overflow-visible sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
                  view === 'column' &&
                    'sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1'
                )}
                style={{
                  transform: 'none',
                  overflowAnchor: 'auto',
                }}
              >
                {folders.map((folder, index) => (
                  <Droppable droppableId={folder.id} key={folder.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={cn(
                          'w-full',
                          snapshot.isDraggingOver && 'animate-pulse'
                        )}
                        style={{ transform: 'none', overflow: 'visible' }}
                      >
                        <Draggable draggableId={folder.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="h-auto w-full"
                              style={
                                snapshot.isDragging
                                  ? {
                                      position: 'fixed',
                                      top: 0,
                                      left: 0,
                                      alignItems: 'flex-start',
                                      ...provided.draggableProps.style,
                                    }
                                  : { transform: 'none', overflow: 'visible' }
                              }
                            >
                              <AnimatePresence>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.6 }}
                                  key={folder.id}
                                >
                                  <Folder folder={folder} />
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          )}
                        </Draggable>
                        {/* {provided.placeholder} */}
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
                        className="h-auto w-full"
                        style={
                          snapshot.isDragging
                            ? {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                overflow: 'visible',
                                ...provided.draggableProps.style,
                              }
                            : { transform: 'none', overflow: 'visible' }
                        }
                      >
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            key={file.id}
                          >
                            <File file={file} />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    )}
                  </Draggable>
                ))}
                {/* {provided.placeholder} */}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : !postbox ? (
        <NoFiles />
      ) : (
        <NoPost />
      )}
    </div>
  )
}
