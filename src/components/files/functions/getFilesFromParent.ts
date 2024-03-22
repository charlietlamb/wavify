export async function getFilesFromParent(supabase: Supabase, parent: string) {
  const { data, error } = await supabase
    .from('files')
    .select('*, users(*)')
    .eq('system', true)
    .eq('folder', parent)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
