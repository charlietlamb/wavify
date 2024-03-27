export async function getUserTopFoldersQuick(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from('folders')
    .select('*, users(*)')
    .eq('user', user.id)
    .is('parent', null)
    .order('createdAt', { ascending: false })
  if (error) throw error
  return data
}
