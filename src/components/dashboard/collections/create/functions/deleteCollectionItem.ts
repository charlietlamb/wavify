export async function deleteCollectionItem(supabase: Supabase, id: string) {
  const { error } = await supabase.from('items').delete().eq('id', id)
  if (error) throw error
}
