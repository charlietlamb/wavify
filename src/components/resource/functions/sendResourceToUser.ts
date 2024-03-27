import getOrCreateConversationClient from './getChatClient'

export default async function sendResourceToUser(
  supabase: Supabase,
  resource: Resource,
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
    resource: resource.id,
  })
  if (error) throw error
}
