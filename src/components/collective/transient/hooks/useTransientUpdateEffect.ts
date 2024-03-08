import { Dispatch, SetStateAction, useEffect } from 'react'
import { getPostboxTopFolders } from '@/components/collective/postbox/functions/getPostboxTopFolders'
import { getTransientFolders } from '../functions/getTransientFolders'

export function useTransientUpdateEffect(
  supabase: Supabase,
  user: User,
  transientFolders: FolderAndSender[],
  setTransientFolders: Dispatch<SetStateAction<FolderAndSender[]>>,
  space: Space | undefined,
  schedule: Schedule | undefined
) {
  useEffect(() => {
    if (!space || !schedule) return
    const channel = supabase
      .channel('transient' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'transients',
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
            setTransientFolders(
              await getTransientFolders(supabase, space, schedule)
            )
          } else if (
            payload.eventType === 'DELETE' &&
            transientFolders.some((folder) => folder.id === payload.old.id)
          ) {
            setTransientFolders(
              transientFolders.filter((folder) => folder.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, transientFolders, setTransientFolders, schedule])
}
