import { getColUserDataFromId } from '@/components/collective/(sidebar)/(functions)/getColUserDataFromId'
import { useEffect } from 'react'

export function useColUserDispatchEffect(
  supabase: Supabase,
  colUser: ColUserAndData,
  colUsers: ColUserAndData[],
  setColUsers: (
    colUsers: ColUserAndData[],
    colUser?: ColUserAndData | 'DELETED'
  ) => void,
  collective: Collective
) {
  useEffect(() => {
    if (!collective) return
    const channel = supabase
      .channel('colUsersUpdated' + colUser.id)
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
            collective.id === newPayload.collective &&
            payload.eventType !== 'DELETE'
          ) {
            const changedColUser = await getColUserDataFromId(
              supabase,
              newPayload.id
            )
            if (!changedColUser) return
            const newColUsers = [
              ...colUsers?.filter((cUser) => cUser.id !== newPayload.id),
              changedColUser,
            ]
            if (newPayload.id === colUser.id) {
              setColUsers(newColUsers, changedColUser)
            } else {
              setColUsers(newColUsers)
            }
          } else {
            if (payload.eventType === 'DELETE') {
              const deletedId = payload.old.id
              if (
                Array.isArray(colUsers) &&
                colUsers?.some((colUser) => colUser.id === deletedId)
              ) {
                if (colUser.id === deletedId)
                  setColUsers(
                    colUsers?.filter((colUser) => colUser.id !== deletedId),
                    'DELETED'
                  )
                setColUsers(
                  colUsers?.filter((colUser) => colUser.id !== deletedId)
                )
              }
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, collective])
}
