import { Dispatch, SetStateAction, useEffect } from 'react'
import { getUserTopFolders } from '../functions/getUserTopFolders'
import { getUserFoldersFromParent } from '../functions/getUserFoldersFromParent'

export function useFolderUpdateEffect(
  supabase: Supabase,
  user: User,
  parent: string | null,
  folders: FolderAndSender[],
  setFolders: Dispatch<SetStateAction<FolderAndSender[]>>
) {
  useEffect(() => {
    const channel = supabase
      .channel('folders' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'folders',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType !== 'DELETE' &&
            newPayload.user === user.id &&
            newPayload.parent === parent
          ) {
            if (payload.eventType === 'INSERT') {
              setFolders(
                parent
                  ? await getUserFoldersFromParent(supabase, user, parent)
                  : await getUserTopFolders(supabase, user)
              )
            } else {
              const oldFolders = folders.filter(
                (folder) => folder.id !== newPayload.id
              )
              setFolders([
                ...oldFolders,
                newPayload as unknown as FolderAndSender,
              ])
            }
          } else if (
            payload.eventType === 'DELETE' &&
            folders.some((folder) => folder.id === payload.old.id)
          ) {
            setFolders(folders.filter((folder) => folder.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, folders, setFolders, parent])
}
