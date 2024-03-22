import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFilesLibrary(path: Path[]) {
  const supabase = createClientComponentClient()
  const parent = path[path.length - 1].id
  const { data, error } = await supabase
    .from('files')
    .select('*, users(*)')
    .eq('system', true)
    .eq('folder', parent)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
