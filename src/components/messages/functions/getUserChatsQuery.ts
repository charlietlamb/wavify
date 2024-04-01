import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getUserChatsQuery = async ({
  pageParam,
  user,
  searchQuery,
}: {
  pageParam: number | undefined
  user: User
  searchQuery: string
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  console.log('getting data')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  console.log('before error1')
  let query = supabase
    .from('chats')
    .select('*, user1(*), user2(*)')
    .or(`user1.eq.${user.id},user2.eq.${user.id}`)
    .order('lastSent', { ascending: false })
  if (searchQuery !== '') query = query.ilike('name', `%${searchQuery}%`)
  query = query.range(startIndex, endIndex)
  const { data, error } = await query
  if (error) throw error
  const chatsAndUsers = data.map((cAndUsers: ChatAndUsers) => {
    const { user1, user2, ...chat } = cAndUsers
    return {
      ...chat,
      users: user1.id === user.id ? user2 : user1,
      user1: null,
      user2: null,
    }
  })
  return chatsAndUsers as ChatAndUser[]
}
