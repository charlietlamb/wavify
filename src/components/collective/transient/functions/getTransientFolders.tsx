import { getFolderData } from '@/components/files/functions/getFolderData'

export async function getTransientFolders(
  supabase: Supabase,
  space: Space,
  schedule: Schedule | undefined
) {
  if (!schedule) return []
  const { data, error } = await supabase
    .from('transients')
    .select('*,folders(*)')
    .eq('space', space.id)
    .eq('schedule', schedule.id)
  if (error) throw error
  const folders = data
    ?.map((t: Transient & { folders: Folder }) => t.folders)
    .flat()
  const foldersWithParent = folders.map((folder: Folder) => ({
    ...folder,
    parent: 't',
  }))
  const foldersToReturn = []
  for (const folder of foldersWithParent) {
    const { size, music } = await getFolderData(
      supabase,
      folder as FolderAndSender
    )
    foldersToReturn.push({ ...folder, size, music })
  }
  return foldersToReturn as FolderAndSender[]
}
