import { Dispatch, SetStateAction, useEffect } from 'react'

export function useSchedulesChangeEffect(
  schedules: Schedule[],
  setSchedule: Dispatch<SetStateAction<Schedule | undefined>>
) {
  useEffect(() => {
    setSchedule(
      schedules.find((schedule: Schedule) => {
        const now = new Date()
        const start = new Date(schedule.start)
        const end = new Date(schedule.end)
        return now >= start && now <= end
      })
    )
  }, [schedules])
}
