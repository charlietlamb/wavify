export async function getUserFilesFromParent(
  supabase: Supabase,
  user: User,
  parent: string
) {
  const { data, error } = await supabase
    .from('files')
    .select('*, user(username, profile_pic_url)')
    .eq('user', user.id)
    .eq('system', true)
    .eq('folder', parent)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
