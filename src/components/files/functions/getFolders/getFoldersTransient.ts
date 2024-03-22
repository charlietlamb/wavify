import { getFolderData } from '@/components/files/functions/getFolders/getFolderData'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFoldersTransient(
  path: Path[],
  schedule: Schedule | null | undefined
) {
  const supabase = createClientComponentClient()
  if (!schedule) return []
  const spaceId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('transients')
    .select('*,folders(*)')
    .eq('space', spaceId)
    .eq('schedule', schedule.id)
  if (error) throw error
  const folders = data
    ?.map((t: Transient & { folders: Folder }) => t.folders)
    .flat()
  const foldersToReturn = []
  for (const folder of folders) {
    const { size, music } = await getFolderData(
      supabase,
      folder as FolderAndSender
    )
    foldersToReturn.push({ ...folder, size, music })
  }
  return foldersToReturn as FolderAndSender[]
}
