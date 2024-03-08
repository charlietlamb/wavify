export async function createTransientSchedule(
  supabase: Supabase,
  name: string,
  start: Date,
  end: Date,
  space: Space
) {
  const schedule = {
    name,
    start,
    end,
    space: space.id,
  }
  const { error } = await supabase.from('schedules').insert(schedule)
  if (error) throw error
}
