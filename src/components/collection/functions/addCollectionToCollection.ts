export async function addCollectionToCollection(
  supabase: Supabase,
  newCollection: Collection,
  collection: Collection,
  user: User
) {
  const { error } = await supabase.from('items').insert({
    user: user.id,
    name: newCollection.name,
    collection: collection.id,
    link: newCollection.id,
    href: `/resource/${newCollection.id}`,
    imageUrl: newCollection.imageUrl,
    type: 'collection',
  })
  if (error) throw error
}
