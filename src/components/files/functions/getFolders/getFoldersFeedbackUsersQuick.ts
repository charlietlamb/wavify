import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFoldersFeedbackUsersQuick(path: Path[]) {
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
  const toReturnMapped = toReturnFlat.map((folder) => {
    return { ...folder, parent: spaceId }
  })
  return toReturnMapped as FolderAndSender[]
}
