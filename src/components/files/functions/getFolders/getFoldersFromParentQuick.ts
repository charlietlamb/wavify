export async function getFoldersFromParentQuick(
  supabase: Supabase,
  parent: string
) {
  const { data, error } = await supabase
    .from('folders')
    .select('*, users(*)')
    .eq('parent', parent)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FolderAndSender[]
}
