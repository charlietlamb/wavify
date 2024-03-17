import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFilesLibrary() {
  const supabase = createClientComponentClient()
  const { path } = useFilesContext()
  const parent = path[path.length - 1]
  const { data, error } = await supabase
    .from('files')
    .select('*, users(username, profile_pic_url)')
    .eq('system', true)
    .eq('folder', parent)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
