export async function getResourceAndUserFromId(supabase: Supabase, id: string) {
  const { data: resource, error } = await supabase
    .from('resources')
    .select('*,users(*)')
    .eq('id', id)
    .single()
  if (error) throw error

  return resource
}
