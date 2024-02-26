export async function getUserRole(colUser: ColUser, supabase: Supabase) {
  const { data: role, error } = await supabase
    .from('roles')
    .select()
    .eq('id', colUser.role)
    .single()
  if (error) throw error
  return role
}
