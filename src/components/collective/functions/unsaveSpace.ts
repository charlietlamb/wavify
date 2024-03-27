export async function unsaveSpace(
  supabase: Supabase,
  user: User,
  space: Space
) {
  const { error } = await supabase
    .from('saves')
    .delete()
    .eq('user', user.id)
    .eq('space', space.id)
  if (error) throw error.message
}
