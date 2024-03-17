import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFolderData } from './getFolderData'
import { useFilesContext } from '../../state/context'

export async function getFoldersLibrary() {
  const supabase = createClientComponentClient()
  const { path } = useFilesContext()
  const parent = path[path.length - 1].id
  let toReturn: FolderAndSender[] = []
  try {
    const { data, error } = await supabase
      .from('folders')
      .select('*, user(username, profile_pic_url)')
      .eq('parent', parent)
      .order('createdAt', { ascending: false })
    if (error) throw error
    toReturn = data
      ? ((await Promise.all(
          (data as FolderAndSender[]).map(async (folder) => {
            const { size, music } = await getFolderData(supabase, folder)
            return { ...folder, size, music } as FolderAndSender
          })
        )) as FolderAndSender[])
      : []
  } catch {
  } finally {
    return toReturn
  }
}
