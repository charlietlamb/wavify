import { Dispatch, SetStateAction, useEffect } from 'react'

export function useSpaceUpdateEffect(
  supabase: Supabase,
  user: User,
  space: Space | undefined,
  setSpace: Dispatch<SetStateAction<Space | undefined>>
) {
  useEffect(() => {
    if (!space) return
    const channel = supabase
      .channel('space_folders' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'spaces',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType !== 'DELETE' &&
            newPayload.id === space.id
          ) {
            setSpace(newPayload as Space)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user])
}
