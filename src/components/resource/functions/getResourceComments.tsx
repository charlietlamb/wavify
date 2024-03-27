import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getResourceComments = async ({
  pageParam,
  resource,
}: {
  pageParam: number | undefined
  resource: Resource
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 8
  const endIndex = startIndex + 1 + 8
  const { data, error } = await supabase
    .from('comments')
    .select('*,users(*)')
    .eq('resource', resource.id)
    .order('createdAt', { ascending: false })
    .range(startIndex, endIndex)

  if (error) throw error
  return data as CommentAndUser[]
}
