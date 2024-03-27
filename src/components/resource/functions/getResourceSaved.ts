export async function getResourceSaved(
  supabase: Supabase,
  user: User,
  resource: Resource
) {
  const { data, error } = await supabase
    .from('saves')
    .select()
    .eq('user', user.id)
    .eq('resource', resource.id)
  if (error) throw error
  return !!data.length
}
