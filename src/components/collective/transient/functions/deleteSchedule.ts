import { Dispatch, SetStateAction } from 'react'

export async function deleteSchedule(
  supabase: Supabase,
  schedule: Schedule | undefined,
  schedules: Schedule[] | undefined,
  setSchedules: Dispatch<SetStateAction<Schedule[]>> | undefined,
  setOpen: Dispatch<SetStateAction<boolean>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  if (!schedule || !schedules || !setSchedules) return
  setIsLoading(true)
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', schedule.id)
  if (error) throw error
  setSchedules(schedules.filter((s: Schedule) => s.id !== schedule.id))
  setOpen(false)
  setIsLoading(false)
}
