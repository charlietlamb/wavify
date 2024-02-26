export async function deleteRole(
  supabase: Supabase,
  role: Role,
  setDeleteLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  setDeleteLoading(true)
  let newRole
  try {
    const { data: roleData } = await supabase
      .from('roles')
      .select()
      .eq('collective', role.collective)
      .eq('authority', role.authority + 1)
      .single()
    newRole = roleData
  } catch {}
  if (!newRole) {
    const { data: roleData, error: roleError } = await supabase
      .from('roles')
      .select()
      .eq('collective', role.collective)
      .eq('authority', role.authority - 1)
      .single()
    if (roleError) throw roleError
    newRole = roleData
  }
  const { error: roleColUsersError } = await supabase
    .from('colUsers')
    .update({ role: newRole.id })
    .eq('role', role.id)
  if (roleColUsersError) throw roleColUsersError
  const { error } = await supabase.from('roles').delete().eq('id', role.id)
  if (error) throw error
  try {
    const { data: updateData, error: updateError } = await supabase
      .from('roles')
      .select()
      .eq('collective', role.collective)
      .gt('authority', role.authority)
    if (updateError) throw updateError
    if (updateData) {
      await Promise.all(
        updateData.map(async (role: Role) => {
          const { error } = await supabase
            .from('roles')
            .update({ authority: role.authority - 1 })
            .eq('id', role.id)
          if (error) throw error
        })
      )
    }
  } catch {}
  setDeleteLoading(false)
}
