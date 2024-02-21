export async function getSearchFilesData(supabase: Supabase, chat: Chat) {
  const { data, error } = await supabase
    .from('messages')
    .select(
      `
            *,
            users ( username, profile_pic_url)
        `
    )
    .eq('chat', chat.id)
    .not('files', 'is', null)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data ? (data as (MessageAndAuthor | null)[]) : undefined
}
