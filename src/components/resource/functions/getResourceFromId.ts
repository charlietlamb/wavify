export async function getResourceFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase.from('resources').select().eq('id', id)
  if (error) throw error
  return data[0]
}
