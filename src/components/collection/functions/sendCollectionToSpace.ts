export async function sendCollectionToSpace(
  supabase: Supabase,
  collection: Collection,
  space: Space,
  user: User
) {
  const { data: chat, error: chatError } = await supabase
    .from('chats')
    .select()
    .eq('space', space.id)
    .single()
  if (chatError) throw chatError
  if (!chat) return
  const { error } = await supabase.from('messages').insert({
    author: user.id,
    files: false,
    chat: chat.id,
    collection: collection.id,
  })
  if (error) throw error
}
