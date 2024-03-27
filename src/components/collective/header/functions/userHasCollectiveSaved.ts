export async function userHasCollectiveSaved(
  supabase: Supabase,
  user: User,
  collective: Collective
) {
  const { data, error } = await supabase
    .from('saves')
    .select()
    .eq('user', user.id)
    .eq('collective', collective.id)
  if (error) throw error
  return data.length > 0
}
