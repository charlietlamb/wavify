export async function getFileFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase
    .from('files')
    .select()
    .eq('id', id)
    .single()
  if (error) {
    throw error
  }
  return data
}
