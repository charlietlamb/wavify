import isObject from '@/lib/isObject'
import { useFilesContext } from '../../state/context'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function getFoldersPostboxQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const { data: space, error: spaceError } = await supabase
    .from('spaces')
    .select('*')
    .eq('id', path[path.length - 1].id)
    .single()
  if (spaceError) throw spaceError
  const { data, error } = await supabase
    .from('postboxes')
    .select('*,users(*)')
    .eq('space', space.id)
    .not('folder', 'is', null)
  if (error) throw error
  const users: User[] = data.map((postbox) => postbox.users)
  if (!users) return []
  const idSet = new Set()
  const uniqueUsers: User[] = Array.isArray(users)
    ? users.filter((user) => {
        if (!idSet.has(user.id)) {
          idSet.add(user.id)
          return true
        }
        return false
      })
    : []
  const userFolders: (FolderAndSender | null)[] = await Promise.all(
    uniqueUsers.map(async (user: User) => {
      if (!isObject(user)) return null
      const { data, error } = await supabase
        .from('postboxes')
        .select('*,users(*)')
        .eq('user', user.id)
      if (error) throw error
      return {
        id: user.id,
        name: user.username,
        parent: `pb`,
        user: user.id,
        createdAt: new Date().toISOString(),
        users: {
          username: user.username,
          imageUrl: user.imageUrl,
        },
        size: 0,
        music: false,
      }
    })
  )
  return userFolders.filter(Boolean) as FolderAndSender[]
}
