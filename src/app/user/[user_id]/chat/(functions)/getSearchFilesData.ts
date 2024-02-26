export async function getSearchFilesData(supabase: Supabase, chat: Chat) {
  const { data, error } = await supabase
    .from('files')
    .select('*,users ( username, profile_pic_url)')
    .eq('chat', chat.id)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data as FileAndSender[]
}
