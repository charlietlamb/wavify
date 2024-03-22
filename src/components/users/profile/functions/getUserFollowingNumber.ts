export async function getUserFollowingNumber(
  supabase: Supabase,
  userId: string
) {
  const { data, error } = await supabase
    .from('followers')
    .select()
    .eq('follower', userId)
  if (error) throw error
  return data.length
}
