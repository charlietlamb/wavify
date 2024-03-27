import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFilesLibraryUser(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('files')
    .select('*, users(*)')
    .eq('user', userId)
    .is('folder', null)
    .is('space', null)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FileAndSender[]
}
