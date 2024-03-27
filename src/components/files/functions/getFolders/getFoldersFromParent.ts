import { getFolderData } from './getFolderData'

export async function getFoldersFromParent(supabase: Supabase, parent: string) {
  let toReturn: FolderAndSender[] = []
  try {
    const { data, error } = await supabase
      .from('folders')
      .select('*, users(*)')
      .eq('parent', parent)
      .order('createdAt', { ascending: false })
    if (error) throw error
    toReturn = data
      ? ((await Promise.all(
          (data as FolderAndSender[]).map(async (folder) => {
            const { size, music } = await getFolderData(supabase, folder)
            return { ...folder, size, music } as FolderAndSender
          })
        )) as FolderAndSender[])
      : []
  } catch {
  } finally {
    return toReturn
  }
}
