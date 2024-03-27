export async function unsaveCollective(
  supabase: Supabase,
  user: User,
  collective: Collective
) {
  const { error } = await supabase
    .from('saves')
    .delete()
    .eq('user', user.id)
    .eq('collective', collective.id)
  if (error) throw error
}
