import { Dispatch, SetStateAction, useEffect } from 'react'
import { getPostboxTopFolders } from '@/components/collective/postbox/functions/getPostboxTopFolders'

export function usePostboxUpdateEffect(
  supabase: Supabase,
  user: User,
  postboxFolders: FolderAndSender[],
  setPostboxFolders: Dispatch<SetStateAction<FolderAndSender[]>>,
  space: Space | undefined,
  setPostboxLastFetch: React.Dispatch<React.SetStateAction<string>>
) {
  useEffect(() => {
    if (!space) return
    const channel = supabase
      .channel('postbox' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'postboxes',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType !== 'DELETE' &&
            newPayload.user === user.id &&
            newPayload.space === space.id
          ) {
            setPostboxFolders(
              await getPostboxTopFolders(supabase, space, user.id)
            )
          } else if (
            payload.eventType === 'DELETE' &&
            postboxFolders.some((folder) => folder.id === payload.old.id)
          ) {
            setPostboxFolders(
              postboxFolders.filter((folder) => folder.id !== payload.old.id)
            )
          }
          setPostboxLastFetch(new Date().toISOString())
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, postboxFolders, setPostboxFolders])
}
