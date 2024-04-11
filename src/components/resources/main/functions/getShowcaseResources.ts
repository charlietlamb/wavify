export async function getShowcaseResources(supabase: Supabase) {
  const { data, error } = await supabase
    .from('resources')
    .select('*,users(*)')
    .eq('showcase', true)
  if (error) throw error
  return data as ResourceAndUser[]
}
