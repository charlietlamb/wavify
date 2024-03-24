import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getUserResources = async ({
  pageParam,
  user,
}: {
  pageParam: number | undefined
  user: User
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 16
  const endIndex = startIndex + 16
  const { data, error } = await supabase
    .from('resources')
    .select()
    .contains('collaborators', [user.id])
    .order('createdAt', { ascending: false })
    .range(startIndex, endIndex)

  if (error) throw error
  console.log(data)
  return data as Resource[]
}
