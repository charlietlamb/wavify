import isObject from '@/lib/isObject'
import { RoleItemContext } from './context'

export async function updateRole(
  supabase: Supabase,
  context: RoleItemContext,
  roles: Role[]
) {
  const { permissions, role, name, emoji, color, setLoading } = context
  if (!isObject(permissions)) return
  setLoading(true)
  const roleToUpdate = {
    ...role,
    name,
    emoji,
    color,
    ...permissions,
    authority: roles.findIndex(
      (role1) => isObject(role1) && role1.id === role.id
    ),
  }
  const { data: data2, error: error2 } = await supabase
    .from('roles')
    .update(roleToUpdate)
    .eq('id', role.id)
    .select()
  if (error2) throw error2
  setLoading(false)
}
