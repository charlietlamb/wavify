import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ResourceType } from '@/components/dashboard/resources/upload/data/data'
import { Sorting } from '@/components/dashboard/resources/manage/data/data'

export const getResources = async ({
  pageParam,
  type,
  sorting,
  searchQuery,
}: {
  pageParam: number | undefined
  type: ResourceType | null
  sorting: Sorting
  searchQuery: string
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase.from('resources').select('*,users(*)')
  if (type) {
    query = query.eq('type', type)
  }
  if (searchQuery !== '') {
    query = query.ilike('name', `%${searchQuery}%`)
    // .or(`description.ilike.%${searchQuery}%`)
    // .or(`tags.cs.{${searchQuery}}`)
  }

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
  return data as ResourceAndUser[]
}
