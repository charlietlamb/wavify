export async function getCollectionCollections(
  supabase: Supabase,
  collection: Collection,
  user: User
) {
  const { data: userCollections, error } = await supabase
    .from('collections')
    .select()
    .eq('user', user.id)
  if (error) throw error
  const toCheck = userCollections.filter(
    (col: Collection) => col.id !== collection.id
  )
  return await Promise.all(
    toCheck.filter(async (col: Collection) => {
      const { data, error } = await supabase
        .from('items')
        .select()
        .eq('collection', col.id)
      if (error) throw error
      return !data.some((item: Item) => item.link === collection.id)
    })
  )
}
