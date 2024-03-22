import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFilesSpace(path: Path[]) {
  const supabase = createClientComponentClient()
  const spaceId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('files')
    .select('*,users(*)')
    .eq('space', spaceId)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FileAndSender[]
}
