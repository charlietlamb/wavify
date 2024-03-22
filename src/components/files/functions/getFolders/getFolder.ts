export async function getFolder(supabase: Supabase, id: string) {
  const { data, error } = await supabase
    .from('folders')
    .select('*,users(*)')
    .eq('id', id)
    .single()
  if (error) throw error

  return data
}
