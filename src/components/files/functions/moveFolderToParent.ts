export async function moveFolderToParent(
  supabase: Supabase,
  folder: FolderAndSender
) {
  const { data, error } = await supabase
    .from('folders')
    .select('parent')
    .eq('id', folder.parent)
  if (error) throw error
  const parent = data![0].parent
  const { error: parentError } = await supabase
    .from('folders')
    .update({ parent })
    .eq('id', folder.id)
  if (parentError) throw parentError
}
