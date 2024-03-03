import { getFolderData } from '@/components/files/functions/getFolderData'

export async function getPostboxTopFolders(
  supabase: Supabase,
  space: Space,
  userId: string
) {
  const { data, error } = await supabase
    .from('postboxes')
    .select('*,folders(*,users(username,profile_pic_url))')
    .eq('space', space.id)
    .eq('user', userId)
    .not('folder', 'is', null)
  if (error) throw error
  const folders = data.map((postbox) => postbox.folders)
  const toReturnFolders = []
  for (const folder of folders) {
    const { size, music } = await getFolderData(supabase, folder)
    toReturnFolders.push({ ...folder, size, music, parent: `u:${userId}` })
  }
  return toReturnFolders
}
