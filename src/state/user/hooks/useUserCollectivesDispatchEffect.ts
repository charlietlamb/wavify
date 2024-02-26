import { useEffect } from 'react'
import { getUserCollectives } from '../functions/getUserCollectives'
export function useUserCollectivesDispatchEffect(
  supabase: Supabase,
  user: User,
  updateCollectives: (collectives: Collective[]) => void
) {
  //trying to update user collectives as they are created and deleted
  //need more info from payload.old
  //also some weird bas setState errors
  useEffect(() => {
    if (!user) return
    const channel = supabase
      .channel('colUsersUpdated' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'colUsers',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            user.id === newPayload.user &&
            payload.eventType !== 'DELETE'
          ) {
            const userCollectives = (await getUserCollectives(
              user,
              supabase
            )) as unknown as Collective[]
            updateCollectives(userCollectives)
          } else {
            if (payload.eventType === 'DELETE') {
              const deletedId = payload.old.id
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user])
}
