export async function getLibrarySearchFiles(supabase: Supabase, space: Space) {
  const { data, error } = await supabase
    .from('files')
    .select()
    .eq('space', space.id)
  if (error) throw error
  return data as FileAndSender[]
}
