export async function getSpaceFromId(supabase: Supabase, space: string) {
  const { data: spaceData, error } = await supabase
    .from('spaces')
    .select()
    .eq('id', space)
    .single()
  if (error) throw error
  return spaceData
}
