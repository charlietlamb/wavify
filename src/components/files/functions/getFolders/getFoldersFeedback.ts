import { getFolder } from '@/components/files/functions/getFolders/getFolder'
import { getFolderData } from '@/components/files/functions/getFolders/getFolderData'
import isObject from '@/lib/isObject'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useFilesContext } from '../../state/context'

export async function getFoldersFeedback(path: Path[]) {
  const supabase = createClientComponentClient()
  const spaceId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('feedbacks')
    .select('*,users!public_feedbacks_user_fkey(*)')
    .eq('space', spaceId)
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
        .select('*,users!public_feedbacks_user_fkey(username,imageUrl)')
        .eq('user', user.id)
      if (error) throw error
      let size = 0
      let music = false
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
        id: user.id,
        name: user.username,
        parent: null,
        user: user.id,
        createdAt: new Date().toISOString(),
        size,
        music,
        users: {
          username: user.username,
          imageUrl: user.imageUrl,
        },
      }
    })
  )
  return userFolders.filter(Boolean) as FolderAndSender[]
}
