import { v4 as uuidv4 } from 'uuid'

export async function createTransientSchedule(
  supabase: Supabase,
  name: string,
  start: Date,
  end: Date,
  space: Space
) {
  const id = uuidv4()
  const schedule = {
    id,
    name,
    start,
    end,
    space: space.id,
  }
  const { error } = await supabase.from('schedules').insert(schedule)
  if (error) throw error
  return schedule
}
