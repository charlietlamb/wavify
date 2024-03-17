import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFoldersLibraryQuick() {
  const supabase = createClientComponentClient()
  const { path } = useFilesContext()
  const parent = path[path.length - 1].id
  const { data, error } = await supabase
    .from('folders')
    .select('*, user(username, profile_pic_url)')
    .eq('parent', parent)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
