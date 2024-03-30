export async function addCollectionItem(
  supabase: Supabase,
  collectionId: string,
  item: ItemAndUser
) {
  const { users, ...toSpread } = item
  const { error } = await supabase.from('items').insert({
    ...toSpread,
    collection: collectionId,
    type: item.text.toLowerCase(),
  })
  if (error) throw error
}
