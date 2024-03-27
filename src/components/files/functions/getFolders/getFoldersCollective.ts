import { musicExtensions } from '@/components/chat/data/extensions'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFolderData } from './getFolderData'

export async function getFoldersCollective(path: Path[]) {
  const supabase = createClientComponentClient()
  const collectiveId = path[path.length - 1].id
  const userId = path[path.length - 2].id
  const { data: user, error: userError } = await supabase
    .from('users')
    .select()
    .eq('id', userId)
    .single()
  if (userError) throw userError
  const { data, error } = await supabase
    .from('spaces')
    .select('*')
    .eq('collective', collectiveId)
  if (error) throw error
  const colFolders = await Promise.all(
    data.map(async (space: Space) => {
      if (space.type !== 'library') return
      const { data: files, error: filesError } = await supabase
        .from('files')
        .select('*')
        .eq('space', space.id)
      if (filesError) throw filesError
      let size = 0
      let music = false
      if (space.folder) {
        const { data: folder, error: folderError } = await supabase
          .from('folders')
          .select('*,users(*)')
          .eq('id', space.folder)
          .single()
        if (folderError) throw folderError
        const { music: folderMusic, size: folderSize } = await getFolderData(
          supabase,
          folder,
          true
        )
        size = folderSize
        music = folderMusic
      }
      return {
        id: space.id,
        name: space.slug,
        parent: null,
        user: userId,
        users: user,
        size,
        music,
      }
    })
  )
  return colFolders.filter(Boolean)
}
