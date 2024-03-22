import { Dispatch, SetStateAction } from 'react'
import { createTransientSchedule } from './createTransientSchedule'

export async function createScheduleFunction(
  supabase: Supabase,
  name: string,
  startDate: Date | undefined,
  endDate: Date | undefined,
  space: Space | undefined,
  schedules: Schedule[] | undefined,
  setError: Dispatch<SetStateAction<string | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) {
  if (!space) {
    setError('Space undefined')
    return false
  }
  if (!name || (name && !name.length)) {
    setError('Set a schedule name')
    return false
  }
  if (!startDate || !endDate) {
    if (!endDate) setError('Please set a end date')
    if (!startDate) setError('Please set a start date')
    return false
  }
  if (startDate < new Date()) {
    setError('Start date is in the past')
    return
  }
  if (endDate < new Date()) {
    setError('End date is in the past')
    return false
  }
  if (endDate < startDate) {
    setError('End date is sooner than the start date')
    return false
  }
  if (schedules)
    for (const scheduleCheck of schedules) {
      if (
        startDate >= new Date(scheduleCheck.start) &&
        startDate <= new Date(scheduleCheck.end)
      ) {
        setError('Start date is already in use')
        return false
      }
      if (
        endDate >= new Date(scheduleCheck.start) &&
        endDate <= new Date(scheduleCheck.end)
      ) {
        setError('End date is already in use')
        return
      }
    }
  setError(null)
  setLoading(true)
  const createdSchedule = await createTransientSchedule(
    supabase,
    name,
    startDate,
    endDate,
    space
  )
  setLoading(false)
  return {
    ...createdSchedule,
    start: createdSchedule.start.toISOString(),
    end: createdSchedule.end.toISOString(),
  } as Schedule
}
