import { v4 as uuidv4 } from 'uuid'

export async function createCollective(
  user: User,
  id: string,
  supabase: Supabase,
  username: string
) {
  const roleId = uuidv4()
  const roleId2 = uuidv4()
  const { error } = await supabase.from('collectives').insert({
    id,
    unique: username,
    roles: [roleId, roleId2],
    founder: user.id,
  })
  if (error) throw error
  const { error: roleError } = await supabase.from('roles').insert({
    id: roleId,
    name: 'founder',
    authority: 0,
    canInvite: true,
    canSettings: true,
    canRoles: true,
    canMembers: true,
    canCreate: true,
    canDelete: true,
    canMessages: true,
    emoji: '👑',
    color: '#FFFFFF',
    collective: id,
  })
  if (roleError) throw roleError

  const { error: roleError2 } = await supabase
    .from('roles')
    .insert({
      id: roleId2,
      name: 'new',
      authority: 1,
      canInvite: false,
      canSettings: false,
      canRoles: false,
      canMembers: true,
      canCreate: false,
      canDelete: false,
      canMessages: false,
      emoji: '👋',
      color: '#FFFFFF',
      collective: id,
    })
    .select()
  if (roleError2) throw roleError2

  const { error: colUserError } = await supabase
    .from('colUsers')
    .insert({
      id: uuidv4(),
      role: roleId,
      collective: id,
      user: user.id,
    })
    .select()
  if (colUserError) throw colUserError

  return error || roleError || roleError2 || colUserError
}
