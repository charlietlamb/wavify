export async function getChatFiles(supabase: Supabase, chat: Chat) {
  const { data, error } = await supabase
    .from('files')
    .select('*,users(*)')
    .eq('chat', chat.id)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FileAndSender[]
}
