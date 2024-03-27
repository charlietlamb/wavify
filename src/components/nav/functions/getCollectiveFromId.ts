export async function getCollectiveFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase
    .from('collectives')
    .select()
    .eq('id', id)
    .single()
  if (error) throw error
  return data as Collective
}
