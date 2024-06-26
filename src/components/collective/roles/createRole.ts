import { useCollective } from '@/state/collective/useCollective'
import { Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'

export async function createRole(
  supabase: Supabase,
  setCreateLoading: Dispatch<SetStateAction<boolean>>,
  collective: Collective,
  roles: Role[]
) {
  setCreateLoading(true)
  const newRole: Role = {
    id: uuidv4(),
    emoji: '👤',
    name: 'new-role',
    color: '#FFFFFF',
    canInvite: false,
    canCreate: false,
    canDelete: false,
    canMembers: false,
    canSettings: false,
    canRoles: false,
    canMessages: false,
    authority: roles.length,
    collective: collective.id,
  }
  // setRoles((prevRoles) =>
  //   [...prevRoles, newRole].sort((a, b) => a.authority - b.authority)
  // );
  const { error } = await supabase.from('roles').insert(newRole)
  if (error) throw error
  setCreateLoading(false)
}
