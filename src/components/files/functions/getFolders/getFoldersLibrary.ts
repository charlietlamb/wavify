import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFolderData } from './getFolderData'
import { useFilesContext } from '../../state/context'

export async function getFoldersLibrary(path: Path[]) {
  const supabase = createClientComponentClient()
  const parent = path[path.length - 1].id
  let toReturn: FolderAndSender[] = []
  try {
    const { data, error } = await supabase
      .from('folders')
      .select('*, users(*)')
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
