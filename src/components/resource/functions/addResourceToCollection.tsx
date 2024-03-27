export async function addResourceToCollection(
  supabase: Supabase,
  resource: Resource,
  collection: Collection
) {
  const { error } = await supabase
    .from('collections')
    .update({
      resources: Array.from(new Set([...collection.resources, resource.id])),
    })
    .eq('id', collection.id)
}
