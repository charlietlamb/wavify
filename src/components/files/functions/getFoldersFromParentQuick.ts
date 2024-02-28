export async function getFoldersFromParentQuick(
  supabase: Supabase,
  parent: string
) {
  const { data, error } = await supabase
    .from('folders')
    .select('*, user(username, profile_pic_url)')
    .eq('parent', parent)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
