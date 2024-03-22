import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFilesPostbox(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const spaceId = path[path.length - 2].id
  const { data, error } = await supabase
    .from('postboxes')
    .select('*,files(*, users(*))')
    .eq('user', userId)
    .eq('space', spaceId)
    .not('file', 'is', null)
  if (error) throw error
  const files = data.map(
    (Postbox: Postbox & { files: FileAndSender[] }) => Postbox.files
  )
  const toReturnFlat = files.flat()
  const toReturnMapped = toReturnFlat.map((file) => {
    return { ...file, folder: 'fd:' + file.user }
  })
  return toReturnMapped as FileAndSender[]
}
