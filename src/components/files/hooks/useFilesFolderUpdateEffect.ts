import { Dispatch, SetStateAction, useEffect } from 'react'
import { getUserTopFiles } from '../functions/getUserTopFiles'
import { getFilesFromParent } from '../functions/getFilesFromParent'

export function useFilesFolderUpdateEffect(
  supabase: Supabase,
  user: User,
  parent: string | null,
  fileStore: React.MutableRefObject<FileAndSender[]>,
  space: Space | undefined
) {
  useEffect(() => {
    const channel = supabase
      .channel('files' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'files',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            (newPayload.user === user.id ||
              (space && newPayload.space === space.id)) &&
            payload.eventType !== 'DELETE'
          ) {
            if (payload.eventType === 'INSERT') {
              fileStore.current = [
                ...fileStore.current,
                newPayload as FileAndSender,
              ]
            } else {
              const oldFiles = fileStore.current.filter(
                (file) => file.id !== newPayload.id
              )
              fileStore.current = [
                ...oldFiles,
                newPayload as unknown as FileAndSender,
              ]
            }
          } else if (
            payload.eventType === 'DELETE' &&
            fileStore.current.some((file) => file.id === payload.old.id)
          ) {
            fileStore.current = fileStore.current.filter(
              (file) => file.id !== payload.old.id
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, parent, fileStore.current])
}
