import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFoldersLibraryQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const parent = path[path.length - 1].id
  const { data, error } = await supabase
    .from('folders')
    .select('*, users(*)')
    .eq('parent', parent)
    .eq('system', true)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
