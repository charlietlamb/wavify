import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Sorting } from '@/components/dashboard/resources/manage/data/data'
import { getUserFromId } from '@/components/files/functions/getUserFromId'
import { getCollectiveFromId } from '@/components/nav/functions/getCollectiveFromId'
import { WavifyType } from '@/components/saved/data/wavifyTypes'

export const getCollectionItemsQuery = async ({
  pageParam,
  user,
  type,
  sorting,
  searchQuery,
  selectedIds = '',
  collection,
}: {
  pageParam: number | undefined
  user: User
  type: WavifyType | null
  sorting: Sorting
  searchQuery: string
  selectedIds?: string
  collection: string
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase.from('items').select('*,users(*)').eq('user', user.id)
  if (collection) query = query.eq('collection', collection)
  if (type) query = query.eq('type', type)
  if (searchQuery !== '') query = query.ilike('name', `%${searchQuery}%`)
  if (!!selectedIds.length) query = query.not('id', 'in', selectedIds)

  if (sorting === 'newest') {
    query = query.order('createdAt', { ascending: false })
  } else if (sorting === 'oldest') {
    query = query.order('createdAt', { ascending: true })
  }
  query = query.range(startIndex, endIndex)
  const { data, error } = await query
  if (error) throw error
  return data as ItemAndUser[]
}
