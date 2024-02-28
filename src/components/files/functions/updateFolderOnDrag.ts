export async function updateFolderOnDrag(
  supabase: Supabase,
  id: string,
  folderInput: string
) {
  let parent: string | null = null
  if (folderInput !== 'null') parent = folderInput
  const { data, error } = await supabase
    .from('folders')
    .update({ parent })
    .eq('id', id)
    .select()
  if (error) throw error
}
