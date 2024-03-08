export async function getScheduleFolders(
  supabase: Supabase,
  schedule: Schedule,
  user: User,
  setFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>
) {
  const { data: transientData, error: transientError } = await supabase
    .from('transients')
    .select('*,folders(*,users(username,profile_pic_url))')
    .eq('schedule', schedule.id)
    .eq('user', user.id)
    .not('folder', 'is', null)

  if (transientError) throw transientError
  const folderIds = transientData
    .map((transient) => transient.folders)
    .flat()
    .map((folder) => folder.id)
  const folderIdsString = `(${folderIds.join(',')})`
  const { data, error } = await supabase
    .from('folders')
    .select('*,users(username,profile_pic_url)')
    .eq('user', user.id)
    .not('id', 'in', folderIdsString)
    .order('createdAt', { ascending: false })
  if (error) throw error
  setFolders(data as FolderAndSender[])
}
