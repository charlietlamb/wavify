import { getUserFromId } from '@/components/files/functions/getUserFromId'

export async function getMostRecentChatAndOtherUser(
  supabase: Supabase,
  user: User
) {
  const { data, error } = await supabase
    .from('chats')
    .select()
    .or(`user1.eq.${user.id},user2.eq.${user.id}`)
    .order('lastSent', { ascending: false })
  if (error) throw error
  const chat = data[0] as Chat
  if (!chat.user1 || !chat.user2)
    throw new Error('Chat does not have user1 or user2')
  const user1 = await getUserFromId(supabase, chat.user1)
  const user2 = await getUserFromId(supabase, chat.user2)
  const otherUser = user1.id === user.id ? user2 : user1
  return {
    ...chat,
    users: otherUser,
    user1: null,
    user2: null,
  } as ChatAndUser
}
