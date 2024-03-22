import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFoldersFromParentQuick } from './getFoldersFromParentQuick'

export async function getFoldersSpaceQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const spaceId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('spaces')
    .select('*,folders(*)')
    .eq('id', spaceId)
    .single()
  if (error) throw error
  const folder = data.folders
  const folders = await getFoldersFromParentQuick(supabase, folder.id)
  return folders as FolderAndSender[]
}
