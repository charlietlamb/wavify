export async function getUserCollectives(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from('colUsers')
    .select('collectives(*)')
    .eq('user', user.id)
  if (error) throw error
  return data.map((col) => col.collectives) as unknown as Collective[]
}
