export async function getCollectionSaved(
  supabase: Supabase,
  user: User,
  collection: Collection
) {
  const { data, error } = await supabase
    .from('saves')
    .select()
    .eq('user', user.id)
    .eq('collection', collection.id)
  if (error) throw error
  return !!data.length
}
