import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getHottestResourcesQuery = async ({
  pageParam,
}: {
  pageParam: number | undefined
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  const { data, error } = await supabase
    .from('resources')
    .select('*, users(*)')
    .order('downloads', { ascending: false })
    .range(startIndex, endIndex)

  if (error) throw error
  return data as ResourceAndUser[]
}
