import { Sorting } from '@/components/dashboard/resources/manage/data/data'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getUsersQuery = async ({
  pageParam,
  searchQuery,
}: {
  pageParam: number | undefined
  searchQuery: string
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase.from('users').select()
  if (searchQuery !== '') query = query.ilike('name', `%${searchQuery}%`)
  query = query.range(startIndex, endIndex)
  const { data, error } = await query
  if (error) throw error
  return data as User[]
}
