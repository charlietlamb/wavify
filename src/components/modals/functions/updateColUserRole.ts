export async function updateColUserRole(
  supabase: Supabase,
  colUser: ColUserAndData,
  role: Role
) {
  const { data, error } = await supabase
    .from('colUsers')
    .update({ role: role.id })
    .eq('id', colUser.id)
    .select()
    .single()
  if (error) throw error

  return data
}
