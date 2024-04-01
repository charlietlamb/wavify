import { Sorting } from '@/components/dashboard/resources/manage/data/data'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getCollectionsQuery = async ({
  pageParam,
  sorting,
  searchQuery,
}: {
  pageParam: number | undefined
  sorting: Sorting
  searchQuery: string
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase
    .from('collections')
    .select('*, users(*)')
    .eq('friendsOnly', false)
  if (searchQuery !== '') query = query.ilike('name', `%${searchQuery}%`)
  if (sorting === 'newest') {
    query = query.order('createdAt', { ascending: false })
  } else if (sorting === 'oldest') {
    query = query.order('createdAt', { ascending: true })
  } else if (sorting === 'popular') {
    query = query.order('downloads', { ascending: false })
  } else if (sorting === 'unpopular') {
    query = query.order('downloads', { ascending: true })
  } else if (sorting === 'largest') {
    query = query.order('size', { ascending: false })
  } else if (sorting === 'smallest') {
    query = query.order('size', { ascending: true })
  }
  query = query.range(startIndex, endIndex)
  const { data, error } = await query
  if (error) throw error
  return data as CollectionAndUser[]
}
