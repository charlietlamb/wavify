export async function getUserCollectives(user: User, supabase: Supabase) {
  const { data, error } = await supabase
    .from('colUsers')
    .select('collective(*)')
    .eq('user', user.id)
  if (error) throw error
  return data
}
