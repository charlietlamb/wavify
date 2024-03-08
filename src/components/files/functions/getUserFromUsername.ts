export async function getUserFromUsername(
  supabase: Supabase,
  username: string
) {
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('username', username)
  if (error) throw error
  return data[0] as User
}
