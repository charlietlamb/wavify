import { Dispatch, SetStateAction, useEffect } from 'react'
import { getFolderData } from '../functions/getFolderData'
import { getFolder } from '../functions/getFolder'

export function useFolderUpdateEffect(
  supabase: Supabase,
  user: User,
  parent: string | null,
  folderStore: React.MutableRefObject<FolderAndSender[]>,
  setFolders: Dispatch<SetStateAction<FolderAndSender[]>>,
  space: Space | undefined
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
            (newPayload.user === user.id ||
              (space && newPayload.space === space.id))
          ) {
            if (payload.eventType === 'INSERT') {
              const { size, music } = await getFolderData(
                supabase,
                newPayload as FolderAndSender
              )
              setFolders([
                ...folderStore.current,
                { ...newPayload, size, music } as FolderAndSender,
              ])
            } else {
              const oldFolder = folderStore.current.find(
                (folder) => folder.id === newPayload.id
              )
              const oldFolders = folderStore.current.filter(
                (folder) => folder.id !== newPayload.id
              )
              setFolders([
                ...oldFolders,
                {
                  ...oldFolder,
                  name: newPayload.name,
                  parent: newPayload.parent,
                } as unknown as FolderAndSender,
              ])
            }
          } else if (
            payload.eventType === 'DELETE' &&
            folderStore.current.some((folder) => folder.id === payload.old.id)
          ) {
            setFolders(
              folderStore.current.filter(
                (folder) => folder.id !== payload.old.id
              )
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, parent, folderStore.current])

  useEffect(() => {
    const channel = supabase
      .channel('folders_files' + user.id)
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
            folderStore.current.some(
              (folder) => folder.id === newPayload.folder
            )
          ) {
            const oldFolders = folderStore.current.filter(
              (folder) => folder.id !== newPayload.folder
            )
            const oldFolder = await getFolder(supabase, newPayload.folder)
            const { size, music } = await getFolderData(
              supabase,
              oldFolder as FolderAndSender
            )
            setFolders([
              ...oldFolders,
              {
                ...oldFolder,
                size,
                music,
              } as unknown as FolderAndSender,
            ])
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, parent, folderStore.current])
}
