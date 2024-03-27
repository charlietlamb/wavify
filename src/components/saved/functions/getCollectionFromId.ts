export async function getCollectionFromId(
  supabase: Supabase,
  collection: string
) {
  const { data: collectionData, error } = await supabase
    .from('collections')
    .select()
    .eq('id', collection)
    .single()
  if (error) throw error
  return collectionData
}
