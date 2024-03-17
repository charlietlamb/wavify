import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFilesFeedback() {
  const supabase = createClientComponentClient()
  const { path } = useFilesContext()
  const userId = path[path.length - 1].id
  const spaceId = path[path.length - 2].id
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*,files(*, users(username,profile_pic_url))')
    .eq('user', userId)
    .eq('space', spaceId)
    .not('file', 'is', null)
  if (error) throw error
  const files = data.map(
    (feedback: Feedback & { files: FileAndSender[] }) => feedback.files
  )
  const toReturnFlat = files.flat()
  const toReturnMapped = toReturnFlat.map((file) => {
    return { ...file, folder: 'fd:' + file.user }
  })
  return toReturnMapped as FileAndSender[]
}
