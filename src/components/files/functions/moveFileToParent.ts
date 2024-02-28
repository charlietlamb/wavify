export async function moveFileToParent(
  supabase: Supabase,
  file: FileAndSender
) {
  if (!file.folder) throw new Error('File does not have a folder')
  const { data, error } = await supabase
    .from('folders')
    .select('parent')
    .eq('id', file.folder)
  if (error) throw error
  const folder = data![0].parent
  const { error: folderError } = await supabase
    .from('files')
    .update({ folder })
    .eq('id', file.id)
  if (folderError) throw folderError
}
