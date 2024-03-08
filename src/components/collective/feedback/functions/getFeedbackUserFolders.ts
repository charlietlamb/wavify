import { getFolder } from '@/components/files/functions/getFolder'
import { getFolderData } from '@/components/files/functions/getFolderData'
import isObject from '@/lib/isObject'

export async function getFeedbackUserFolders(supabase: Supabase, space: Space) {
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*,users!public_feedbacks_user_fkey(*)')
    .eq('space', space.id)
    .not('folder', 'is', null)

  if (error) throw error
  const users: User[] = data.map((feedback) => feedback.users)
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
        .from('feedbacks')
        .select('*,users!public_feedbacks_user_fkey(username,profile_pic_url)')
        .eq('user', user.id)
      if (error) throw error
      let size = 0
      let music = false
      console.log(data)
      for (const folder of data) {
        if (folder.folder) {
          const newFolder = await getFolder(supabase, folder.folder)
          const { size: folderSize, music: folderMusic } = await getFolderData(
            supabase,
            newFolder
          )
          size += folderSize
          if (!music && folderMusic) music = true
        }
      }
      return {
        id: 'fd:' + user.id,
        name: user.username,
        parent: `f`,
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
