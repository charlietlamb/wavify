export async function getTransientSchedules(supabase: Supabase, space: Space) {
  const { data, error } = await supabase
    .from('schedules')
    .select()
    .eq('space', space.id)
  if (error) throw error
  return data as Schedule[]
}
