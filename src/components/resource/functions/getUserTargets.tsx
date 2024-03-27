export async function getUserTargets(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from('followers')
    .select('*,users!public_followers_follower_fkey(*)')
    .eq('user', user.id)
  if (error) throw error
  const users = data.map((d: Follower & { users: User }) => ({
    ...d.users,
    isUser: true,
  }))
  const { data: colUsers, error: colError } = await supabase
    .from('colUsers')
    .select()
    .eq('user', user.id)
  if (colError) throw colError
  let spacesAndCollectives = []
  for (const cu of colUsers) {
    const { data, error } = await supabase
      .from('spaces')
      .select('*,collectives(*)')
      .eq('collective', cu.collective)
      .eq('type', 'text')
    if (error) throw error
    spacesAndCollectives.push(
      ...data.map((d: Space & { collectives: Collective }) => ({
        ...d,
        isUser: false,
      }))
    )
  }
  return [...users, ...spacesAndCollectives]
}
