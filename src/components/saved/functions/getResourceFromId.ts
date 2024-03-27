export async function getResourceFromId(supabase: Supabase, resource: string) {
  const { data: resourceData, error } = await supabase
    .from('resources')
    .select()
    .eq('id', resource)
    .single()
  if (error) throw error
  return resourceData
}
