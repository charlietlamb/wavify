import { musicExtensions } from '@/components/chat/data/extensions'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFoldersFromParent } from './getFoldersFromParent'

export async function getFoldersCollectives(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('username,profile_pic_url')
    .eq('id', userId)
    .single()
  if (userError) throw userError
  const { data, error } = await supabase
    .from('colUsers')
    .select('*,collectives(*)')
    .eq('user', userId)
  if (error) throw error
  const collectives = data.map(
    (colUser: ColUser & { collectives: Collective }) => colUser.collectives
  )
  const colFolders = await Promise.all(
    collectives.map(async (col: Collective) => {
      const { data: spaces, error: spacesError } = await supabase
        .from('spaces')
        .select('*')
        .eq('collective', col.id)
      if (spacesError) throw spacesError
      const spaceIds = spaces.map((space: Space) =>
        space.type === 'library' ? space.folder : null
      )
      const spaceIdsNotNull = spaceIds.filter(Boolean) as string[]
      let size = 0
      let music = false
      for (const id of spaceIdsNotNull) {
        const folders = await getFoldersFromParent(supabase, id)
        for (const folder of folders) {
          size += folder.size
          if (!music) {
            music = folder.music
          }
        }
      }
      return {
        id: col.id,
        name: col.unique,
        parent: null,
        user: userId,
        users: user,
        size,
        music,
      }
    })
  )
  return colFolders
}
