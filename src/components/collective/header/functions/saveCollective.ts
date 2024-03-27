export async function saveCollective(
  supabase: Supabase,
  user: User,
  collective: Collective
) {
  const { error } = await supabase
    .from('saves')
    .insert({ user: user.id, collective: collective.id })
  if (error) throw error
}
