export async function getUserFollowersNumber(
  supabase: Supabase,
  userId: string
) {
  const { data, error } = await supabase
    .from('followers')
    .select()
    .eq('user', userId)
  if (error) throw error
  return data.length
}
