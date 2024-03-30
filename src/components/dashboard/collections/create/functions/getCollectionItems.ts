export async function getCollectionItems(supabase: Supabase, id: string) {
  const { data: items, error } = await supabase
    .from('items')
    .select('*,users(*)')
    .eq('collection', id)
  if (error) throw error
  return items || []
}
