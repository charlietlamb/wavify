export async function getPostboxSearchFiles(supabase: Supabase, space: Space) {
  let returnFiles: FileAndSender[] = []
  const { data, error } = await supabase
    .from('postboxes')
    .select('*,folders(*,users(*))')
    .eq('space', space.id)
    .not('folder', 'is', null)
  if (error) throw error
  const topFolders = data.map((postbox) => postbox.folders)
  async function getFolderDataRecursively(folders: FolderAndSender[]) {
    let returnFiles: FileAndSender[] = []
    try {
      for (const folder of folders) {
        const { data, error } = await supabase
          .from('files')
          .select('*,users(*)')
          .eq('folder', folder.id)
        if (error) throw error
        const files = data as FileAndSender[]
        returnFiles = [...returnFiles, ...files]
      }
    } catch (error) {
      throw error
    }
    try {
      for (const folder of folders) {
        const { data, error } = await supabase
          .from('folders')
          .select('*,users(*)')
          .eq('parent', folder.id)
        if (error) throw error
        getFolderDataRecursively(data as FolderAndSender[])
      }
    } catch (error) {
      throw error
    }
  }
  await getFolderDataRecursively(topFolders)
  return returnFiles
}
