import { getFolderData } from '@/components/files/functions/getFolders/getFolderData'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFoldersPostboxUsers(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const spaceId = path[path.length - 2].id
  const { data, error } = await supabase
    .from('postboxes')
    .select('*,folders(*,users(*))')
    .eq('space', spaceId)
    .eq('user', userId)
    .not('folder', 'is', null)
  if (error) throw error
  const folders = data.map((postbox) => postbox.folders)
  const toReturnFolders = []
  for (const folder of folders) {
    const { size, music } = await getFolderData(supabase, folder)
    toReturnFolders.push({ ...folder, size, music, parent: userId })
  }
  return toReturnFolders
}
