export async function addCollectionItems(
  supabase: Supabase,
  collectionId: string,
  items: ItemAndUser[]
) {
  for (const item of items) {
    const { users, ...toSpread } = item
    const { error } = await supabase
      .from('items')
      .insert({
        ...toSpread,
        collection: collectionId,
        type: item.text.toLowerCase(),
      })
    if (error) throw error
  }
}
