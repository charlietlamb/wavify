export async function getUserFiles(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from('files')
    .select('*,users(username,profile_pic_url)')
    .eq('user', user.id)
  if (error) throw error
  return data as FileAndSender[]
}
