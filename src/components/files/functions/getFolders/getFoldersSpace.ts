import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFoldersFromParent } from './getFoldersFromParent'

export async function getFoldersSpace(path: Path[]) {
  const supabase = createClientComponentClient()
  const spaceId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('spaces')
    .select('*,folders(*)')
    .eq('id', spaceId)
    .single()
  if (error) throw error
  const folder = data.folders
  const folders = await getFoldersFromParent(supabase, folder.id)
  return folders as FolderAndSender[]
}
