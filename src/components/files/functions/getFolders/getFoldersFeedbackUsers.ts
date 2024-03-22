import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'
import { getFolderData } from './getFolderData'

export async function getFoldersFeedbackUsers(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const spaceId = path[path.length - 2].id
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*,folders(*, users(*))')
    .eq('user', userId)
    .eq('space', spaceId)
    .not('folder', 'is', null)
  if (error) throw error
  const folders = data.map(
    (feedback: Feedback & { folders: FolderAndSender[] }) => feedback.folders
  )
  const toReturnFlat = folders.flat()
  const toReturnMapped = await Promise.all(
    toReturnFlat.map(async (folder) => {
      const { size, music } = await getFolderData(supabase, folder)
      return { ...folder, parent: spaceId, size, music }
    })
  )

  return toReturnMapped as FolderAndSender[]
}
