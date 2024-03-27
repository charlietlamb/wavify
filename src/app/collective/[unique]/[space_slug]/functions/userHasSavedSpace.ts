export async function userHasSavedSpace(
  supabase: Supabase,
  user: User,
  space: Space
) {
  const { data, error } = await supabase
    .from('saves')
    .select()
    .eq('user', user.id)
    .eq('space', space.id)
  if (error) {
    console.error(error)
    return false
  }
  return data.length > 0
}
