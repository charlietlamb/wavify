import { getFolderData } from '../../functions/getFolders/getFolderData'

export async function getUserFolders(
  supabase: Supabase,
  user: User,
  setFolders: React.Dispatch<React.SetStateAction<FolderAndSender[]>>
) {
  const { data: postboxData, error: postboxError } = await supabase
    .from('postboxes')
    .select('*,folders(*,users(*))')
    .eq('user', user.id)
    .not('folder', 'is', null)
  if (postboxError) throw postboxError
  const folderIds = postboxData
    .map((postbox) => postbox.folders)
    .flat()
    .map((folder) => folder.id)
  const folderIdsString = `(${folderIds.join(',')})`
  const { data, error } = await supabase
    .from('folders')
    .select('*,users(*)')
    .eq('user', user.id)
    .not('id', 'in', folderIdsString)
    .order('createdAt', { ascending: false })
  if (error) throw error
  setFolders(data as FolderAndSender[])
}
