import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFilesChat(path: Path[]) {
  const supabase = createClientComponentClient()
  const chatId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('files')
    .select('*,users(*)')
    .eq('chat', chatId)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FileAndSender[]
}
