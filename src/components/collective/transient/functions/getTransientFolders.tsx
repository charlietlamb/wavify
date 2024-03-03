export async function getTransientFolders(supabase: Supabase, space: Space) {
  const { data, error } = await supabase
    .from('transients')
    .select('*,folders(*)')
    .eq('id', space.id)
  if (error) throw error
  const folders = data
    ?.map((t: Transient & { folders: Folder }) => t.folders)
    .flat()
  const foldersWithParent = folders.map((folder: Folder) => ({
    ...folder,
    parent: 't',
  }))
  return foldersWithParent as FolderAndSender[]
}
