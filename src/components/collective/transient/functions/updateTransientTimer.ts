import { Dispatch, SetStateAction } from 'react'

export async function updateTransientTimer(
  supabase: Supabase,
  startDate: Date | undefined,
  endDate: Date | undefined,
  schedule: Schedule | undefined,
  schedules: Schedule[] | undefined,
  setError: Dispatch<SetStateAction<string | null>>
) {
  if (!schedule || !schedules) {
    setError('Schedules not defined')
    return false
  }
  if (!startDate || !endDate) {
    if (!endDate) setError('Please set a end date')
    if (!startDate) setError('Please set a start date')
    return false
  }
  if (startDate < new Date()) {
    setError('Start date is in the past')
    return false
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
      if (scheduleCheck.id === schedule.id) continue
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
        return false
      }
    }
  setError(null)
  const { error } = await supabase
    .from('schedules')
    .update({ start: startDate, end: endDate })
    .eq('id', schedule.id)
  if (error) throw error
  return true
}
