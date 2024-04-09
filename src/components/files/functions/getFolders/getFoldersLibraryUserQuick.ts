import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFoldersLibraryUserQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('folders')
    .select('*, users(*)')
    .eq('user', userId)
    .is('parent', null)
    .eq('system', true)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FolderAndSender[]
}
