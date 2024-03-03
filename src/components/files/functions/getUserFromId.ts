export async function getUserFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase.from('users').select().eq('id', id)
  if (error) throw error
  return data[0] as User
}
