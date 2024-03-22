import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getUserFromId } from '../getUserFromId'

export async function getFoldersChatsQuick(path: Path[]) {
  const supabase = createClientComponentClient()
  const userId = path[path.length - 1].id
  const { data, error } = await supabase
    .from('chats')
    .select()
    .eq('type', 'user')
    .eq('user1', userId)
    .not('user2', 'is', null)
  if (error) throw error
  const data1AndUser = await Promise.all(
    data.map(async (chat: Chat) => {
      if (!chat.user2) throw new Error('user2 is null')
      const user = await getUserFromId(supabase, chat.user2)
      return { ...chat, users: user }
    })
  )
  const { data: data2, error: error2 } = await supabase
    .from('chats')
    .select()
    .eq('type', 'user')
    .eq('user2', userId)
    .not('user1', 'is', null)
  if (error2) throw error2
  const data2AndUser = await Promise.all(
    data2.map(async (chat: Chat) => {
      if (!chat.user1) throw new Error('user1 is null')
      const user = await getUserFromId(supabase, chat.user1)
      return { ...chat, users: user }
    })
  )
  const chats = data1AndUser
    .concat(data2AndUser)
    .filter((chat) => chat.users.id !== userId)
  const chatFolders = chats.map(
    (chat: Chat & { users: User }) =>
      ({
        id: chat.id,
        name: chat.users.username,
        parent: null,
        user: userId,
        users: chat.users,
        createdAt: chat.createdAt,
        size: 0,
        music: false,
      }) as FolderAndSender
  )
  return chatFolders
}
