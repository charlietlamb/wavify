export async function getTransientSchedule(supabase: Supabase, space: Space) {
  const { data, error } = await supabase
    .from('schedules')
    .select()
    .eq('space', space.id)
  if (error) throw error
  const currentSchedule = data?.find((schedule: Schedule) => {
    const now = new Date()
    const start = new Date(schedule.start)
    const end = new Date(schedule.end)
    return now >= start && now <= end
  })
  return currentSchedule
}
