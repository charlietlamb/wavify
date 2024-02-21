export async function deleteSpace(
  collective: Collective,
  slug: string,
  supabase: Supabase
) {
  const { data, error } = await supabase
    .from('spaces')
    .delete()
    .eq('slug', slug)
    .eq('collective', collective.id)
  if (error) {
    console.error('Error deleting space', error)
  }
}
