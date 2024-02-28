export async function updateFileOnDrag(
  supabase: Supabase,
  id: string,
  folderInput: string
) {
  let folder: string | null = null
  if (folderInput !== 'null') folder = folderInput
  const { error } = await supabase.from('files').update({ folder }).eq('id', id)
  if (error) throw error
}
