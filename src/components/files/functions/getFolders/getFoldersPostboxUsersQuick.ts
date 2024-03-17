import { getFolderData } from '@/components/files/functions/getFolders/getFolderData'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFoldersPostboxUsersQuick() {
  const supabase = createClientComponentClient()
  const { path } = useFilesContext()
  const userId = path[path.length - 1].id
  const spaceId = path[path.length - 2].id
  const { data, error } = await supabase
    .from('postboxes')
    .select('*,folders(*,users(username,profile_pic_url))')
    .eq('space', spaceId)
    .eq('user', userId)
    .not('folder', 'is', null)
  if (error) throw error
  return data.map((postbox) => postbox.folders)
}
