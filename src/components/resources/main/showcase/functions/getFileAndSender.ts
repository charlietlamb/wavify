export async function getFileAndSender(supabase: Supabase, id: string) {
  const { data, error } = await supabase
    .from('files')
    .select('*,users(*)')
    .eq('id', id)
    .single()
  if (error) throw error

  return data as FileAndSender
}
