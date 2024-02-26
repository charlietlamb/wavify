export async function getMessageFiles(
  supabase: Supabase,
  message: MessageAndAuthor
) {
  if (!message.files) return []

  const { data, error } = await supabase
    .from('files')
    .select()
    .eq('message', message.id)
  if (error) throw error
  return data as FileData[]
}
