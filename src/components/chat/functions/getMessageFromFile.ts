export async function getMessageFromFile(supabase: Supabase, file: FileData) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, users(*)')
    .eq('id', file.message)
    .single()
  if (error) throw error
  return data as MessageAndAuthor
}
