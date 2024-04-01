import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getUserActivityQuery = async ({
  pageParam = 1,
  user,
}: {
  pageParam?: number
  user: User
}) => {
  if (!user || typeof user.id !== 'string') {
    throw new Error('Invalid user')
  }

  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase
    .from('actions')
    .select('*,parent(*)')
    .eq('child', user.id)
  query = query.range(startIndex, endIndex)
  const { data, error } = await query
  if (error) throw error
  if (!Array.isArray(data)) {
    throw new Error('Data is not an array')
  }
  const dataAndUsers = data.map((action) => ({
    ...action,
    users: action.parent,
    parent: null,
  }))
  return dataAndUsers as ActionAndUser[]
}
