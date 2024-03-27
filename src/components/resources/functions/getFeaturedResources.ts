export async function getFeaturedResources(supabase: Supabase) {
  const { data, error } = await supabase
    .from('resources')
    .select('*,users(*)')
    .eq('featured', true)
  if (error) throw error

  return data
}
