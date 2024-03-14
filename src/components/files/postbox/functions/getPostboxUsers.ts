import isObject from '@/lib/isObject'
import { getFolderData } from '../../functions/getFolderData'
import { getFolder } from '../../functions/getFolder'

export async function getPostboxUsers(supabase: Supabase, space: Space) {
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
        .select('*,users(username,profile_pic_url)')
        .eq('user', user.id)
      if (error) throw error
      let size = 0
      let music = false
      for (const folder of data) {
        const newFolder = await getFolder(supabase, folder.folder)
        const { size: folderSize, music: folderMusic } = await getFolderData(
          supabase,
          newFolder
        )
        size += folderSize
        if (!music && folderMusic) music = true
      }
      return {
        id: user.id,
        name: user.username,
        parent: `pb`,
        user: user.id,
        createdAt: new Date().toISOString(),
        size,
        music,
        users: {
          username: user.username,
          profile_pic_url: user.profile_pic_url,
        },
      }
    })
  )
  return userFolders.filter(Boolean) as FolderAndSender[]
}