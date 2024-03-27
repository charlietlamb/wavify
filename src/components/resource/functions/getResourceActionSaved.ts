export async function getResourceActionSaved(
  supabase: Supabase,
  user: User,
  resource: Resource
) {
  const { data, error } = await supabase
    .from('actions')
    .select()
    .eq('child', user.id)
    .eq('resource', resource.id)
    .eq('action', 'save')
  if (error) throw error
  return !!data.length
}
