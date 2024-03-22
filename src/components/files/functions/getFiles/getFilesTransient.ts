import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFilesTransient(
  path: Path[],
  schedule: Schedule | null | undefined
) {
  if (!schedule) return []
  const supabase = createClientComponentClient()
  const spaceId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('transients')
    .select()
    .eq('space', spaceId)
    .eq('schedule', schedule.id)
  if (error) throw error
  const folderIds = data.map((transient: Transient) => transient.folder)
  const { data: files, error: filesError } = await supabase
    .from('files')
    .select('*,users(*)')
    .in('folder', folderIds)
  if (filesError) throw filesError
  return files as FileAndSender[]
}
