export async function getFolder(supabase: Supabase, id: string) {
  console.log(id)
  const { data, error } = await supabase
    .from('folders')
    .select('*,users(username,profile_pic_url)')
    .eq('id', id)
    .single()
  if (error) throw error

  return data
}
