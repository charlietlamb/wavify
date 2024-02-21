import { Dispatch, SetStateAction } from 'react'

export async function updateRoles(
  supabase: Supabase,
  setRolesAndAllowed: Dispatch<SetStateAction<RoleAndAllowed[]>>,
  collective: Collective
) {
  const { data: roles, error } = await supabase
    .from('roles')
    .select('*')
    .eq('collective', collective?.id)
  if (error) throw error
  roles &&
    setRolesAndAllowed(
      roles
        .map((role: RoleAndAllowed) => ({
          ...role,
          allowed: false,
        }))
        .sort((a, b) => a.authority - b.authority)
    )
}
