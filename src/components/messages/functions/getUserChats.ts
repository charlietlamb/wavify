export async function getUserChats(supabase: Supabase, user: User) {
  const { data, error } = await supabase
    .from('chats')
    .select()
    .or(`user1.eq.${user.id},user2.eq.${user.id}`)
  if (error) throw error
  return data as Chat[]
}
