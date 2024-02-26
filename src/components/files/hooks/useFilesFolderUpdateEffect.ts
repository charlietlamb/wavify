import { Dispatch, SetStateAction, useEffect } from 'react'
import { getUserTopFiles } from '../functions/getUserTopFiles'
import { getUserFilesFromParent } from '../functions/getUserFilesFromParent'

export function useFilesFolderUpdateEffect(
  supabase: Supabase,
  user: User,
  parent: string | null,
  fileData: FileAndSender[],
  setFileData: Dispatch<SetStateAction<FileAndSender[]>>
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
            newPayload.user === user.id &&
            newPayload.folder === parent &&
            payload.eventType !== 'DELETE'
          ) {
            if (payload.eventType === 'INSERT') {
              setFileData(
                parent
                  ? await getUserFilesFromParent(supabase, user, parent)
                  : await getUserTopFiles(supabase, user)
              )
            } else {
              const oldFiles = fileData.filter(
                (file) => file.id !== newPayload.id
              )
              setFileData([...oldFiles, newPayload as unknown as FileAndSender])
            }
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
  }, [supabase, user, fileData, parent, setFileData])
}
