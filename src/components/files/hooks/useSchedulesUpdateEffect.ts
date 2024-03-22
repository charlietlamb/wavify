import { Dispatch, SetStateAction, useEffect } from 'react'

export function useSchedulesUpdateEffect(
  supabase: Supabase,
  user: User,
  space: Space | undefined,
  schedules: Schedule[],
  setSchedules: Dispatch<SetStateAction<Schedule[]>>
) {
  useEffect(() => {
    if (!space) return
    const channel = supabase
      .channel('schedules' + user.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'schedules',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType !== 'DELETE' &&
            newPayload.space === space.id
          ) {
            if (payload.eventType === 'INSERT') {
              setSchedules([...schedules, newPayload as Schedule])
            } else if (payload.eventType === 'UPDATE') {
              setSchedules(
                schedules.map((schedule: Schedule) =>
                  schedule.id === newPayload.id
                    ? (newPayload as Schedule)
                    : schedule
                )
              )
            }
          } else {
            if (
              schedules.some(
                (schedule: Schedule) =>
                  'id' in payload.old && schedule.id === payload.old.id
              )
            )
              setSchedules(
                schedules.filter(
                  (schedule: Schedule) =>
                    'id' in payload.old && schedule.id !== payload.old.id
                )
              )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user, schedules, space, setSchedules])
}
