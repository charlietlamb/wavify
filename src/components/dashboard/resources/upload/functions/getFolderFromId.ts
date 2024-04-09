export async function getFolderFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase.from('folders').select().eq('id', id)
  if (error) throw error
  return data[0]
}
