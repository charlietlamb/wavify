import { Dispatch, SetStateAction, useEffect } from 'react'
import { getUserFiles } from '../functions/getUserFiles'
import { getLibrarySearchFiles } from '@/app/library/functions/getLibrarySearchFiles'

export function useFileUpdateEffect(
  supabase: Supabase,
  user: User,
  fileData: FileAndSender[],
  setFileData: Dispatch<SetStateAction<FileAndSender[]>>,
  space: Space | undefined
) {
  useEffect(() => {
    const channel = supabase
      .channel('files_search' + user.id)
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
            payload.eventType !== 'DELETE' &&
            (newPayload.user === user.id ||
              (space && newPayload.space === space.id))
          ) {
            setFileData(
              !space
                ? await getUserFiles(supabase, user)
                : await getLibrarySearchFiles(supabase, space)
            )
          } else if (
            payload.eventType === 'DELETE' &&
            fileData.some((file) => file.id === payload.old.id)
          ) {
            setFileData(fileData.filter((file) => file.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, fileData, setFileData])
}
