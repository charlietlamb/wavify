export async function addResourceToCollection(
  supabase: Supabase,
  resource: Resource,
  collection: Collection,
  user: User
) {
  const { error } = await supabase.from('items').insert({
    user: user.id,
    name: resource.name,
    collection: collection.id,
    link: resource.id,
    href: `/resource/${resource.id}`,
    imageUrl: resource.imageUrl,
    type: 'resource',
  })
  if (error) throw error
}
