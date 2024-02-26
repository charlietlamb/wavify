export async function getUserTopFiles(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from('files')
    .select('*, user(username, profile_pic_url)')
    .eq('user', user.id)
    .eq('system', true)
    .is('folder', null)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
