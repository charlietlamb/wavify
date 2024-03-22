import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFolderData } from './getFolderData'
import { useFilesContext } from '../../state/context'

export async function getFoldersLibrary(path: Path[]) {
  const supabase = createClientComponentClient()
  const parent = path[path.length - 1].id
  console.log(parent)
  let toReturn: FolderAndSender[] = []
  try {
    const { data, error } = await supabase
      .from('folders')
      .select('*, user(username, profile_pic_url)')
      .eq('parent', parent)
      .order('createdAt', { ascending: false })
    if (error) throw error
    console.log(data)
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
    console.log(toReturn)
    return toReturn
  }
}
