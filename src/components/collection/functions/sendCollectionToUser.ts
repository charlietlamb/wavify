import getOrCreateConversationClient from '@/components/resource/functions/getChatClient'

export async function sendCollectionToUser(
  supabase: Supabase,
  collection: Collection,
  otherUser: User,
  user: User
) {
  const chat = await getOrCreateConversationClient({
    memberOneId: user.id,
    memberTwoId: otherUser.id,
  })
  if (!chat || !('id' in chat)) return
  const { error } = await supabase.from('messages').insert({
    author: user.id,
    files: false,
    chat: chat.id,
    collection: collection.id,
  })
  if (error) throw error
}
