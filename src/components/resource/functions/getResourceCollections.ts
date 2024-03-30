export async function getResourceCollections(
  supabase: Supabase,
  resource: Resource,
  user: User
) {
  const { data, error } = await supabase
    .from('collections')
    .select()
    .eq('user', user.id)
  if (error) throw error
  return await Promise.all(
    data.filter(async (col: Collection) => {
      const { data, error } = await supabase
        .from('items')
        .select()
        .eq('collection', col.id)
      if (error) throw error
      return !data.some((item: Item) => item.link === resource.id)
    })
  )
}
