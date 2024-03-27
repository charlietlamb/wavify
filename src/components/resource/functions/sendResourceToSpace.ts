export default async function sendResourceToSpace(
  supabase: Supabase,
  resource: Resource,
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
    resource: resource.id,
  })
  if(error) throw error
}
