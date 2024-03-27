export async function getResourceCollections(
  supabase: Supabase,
  resource: Resource,
  user: User
) {
  const { data, error } = await supabase
    .from('collections')
    .select()
    .eq('user', user.id)
  if (error) throw error
  return data.filter((col: Collection) => !col.resources.includes(resource.id))
}
