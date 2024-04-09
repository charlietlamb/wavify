import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFolderData } from './getFolderData'

export async function getFoldersLibraryUser(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('folders')
    .select('*, users(*)')
    .eq('user', userId)
    .eq('system', true)
    .is('parent', null)
    .order('createdAt', { ascending: false })
  const toReturn = data
    ? ((await Promise.all(
        (data as FolderAndSender[]).map(async (folder) => {
          const { size, music } = await getFolderData(supabase, folder)
          return { ...folder, size, music } as FolderAndSender
        })
      )) as FolderAndSender[])
    : []
  if (error) throw error
  return toReturn
}
