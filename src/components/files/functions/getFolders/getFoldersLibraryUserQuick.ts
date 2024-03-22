import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFoldersLibraryUserQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('folders')
    .select('*, user(username, profile_pic_url)')
    .eq('user', userId)
    .is('parent', null)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FolderAndSender[]
}
