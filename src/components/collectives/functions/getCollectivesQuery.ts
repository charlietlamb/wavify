import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SortingTime } from '../data/sortingTime'

export const getCollectivesQuery = async ({
  pageParam,
  sorting,
  searchQuery,
}: {
  pageParam: number | undefined
  sorting: SortingTime
  searchQuery: string
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase
    .from('collectives')
    .select('*, users(*)')
    .eq('type', 'public')
  if (searchQuery !== '') query = query.ilike('unique', `%${searchQuery}%`)
  if (sorting === 'newest') {
    query = query.order('createdAt', { ascending: false })
  } else if (sorting === 'oldest') {
    query = query.order('createdAt', { ascending: true })
  }
  query = query.range(startIndex, endIndex)
  const { data, error } = await query
  if (error) throw error
  return data as CollectiveAndUser[]
}
