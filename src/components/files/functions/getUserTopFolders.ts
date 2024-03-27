import { getFolderData } from './getFolders/getFolderData'

export async function getUserTopFolders(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from('folders')
    .select('*, users(*)')
    .eq('user', user.id)
    .is('parent', null)
    .order('createdAt', { ascending: false })
  const toReturn = data
    ? ((await Promise.all(
        (data as FolderAndSender[]).map(async (folder) => {
          const { size, music } = await getFolderData(supabase, folder)
          return { ...folder, size, music } as FolderAndSender
        })
      )) as FolderAndSender[])
    : []
  if (error) throw error
  return toReturn
}
