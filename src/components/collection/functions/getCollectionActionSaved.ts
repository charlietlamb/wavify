export async function getCollectionActionSaved(
  supabase: Supabase,
  user: User,
  collection: Collection
) {
  const { data, error } = await supabase
    .from('actions')
    .select()
    .eq('child', user.id)
    .eq('collection', collection.id)
    .eq('action', 'save')
  if (error) throw error
  return !!data.length
}
