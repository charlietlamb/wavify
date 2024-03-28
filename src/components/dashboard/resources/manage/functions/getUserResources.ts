import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Sorting, Visibility } from '../data/data'

export const getUserResources = async ({
  pageParam,
  user,
  visibility,
  sorting,
}: {
  pageParam: number | undefined
  user: User
  visibility: Visibility | null
  sorting: Sorting
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  let query = supabase
    .from('resources')
    .select()
    .contains('collaborators', [user.id])
  if (visibility === 'public') {
    query = query.eq('draft', false)
  } else if (visibility === 'draft') {
    query = query.eq('draft', true)
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
  return data as Resource[]
}
