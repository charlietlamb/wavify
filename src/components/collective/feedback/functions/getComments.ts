import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const getComments = async ({
  pageParam,
  file,
  folder,
  space,
  feedbackGive,
}: {
  pageParam: number | undefined
  file: FileAndSender | undefined
  folder: FolderAndSender | undefined
  space: Space | undefined
  feedbackGive: boolean | undefined
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 6
  const endIndex = startIndex + 1 + 6
  let response
  if (folder) {
    if (!feedbackGive) {
      response = await supabase
        .from('comments')
        .select(
          `
                      *,
                      users(*)
                  `
        )
        .eq('folder', folder.id)
        .order('createdAt', { ascending: false })
        .range(startIndex, endIndex)
    } else if (space) {
      response = await supabase
        .from('comments')
        .select(
          `
                      *,
                      users(*)
                  `
        )
        .eq('folder', folder.id)
        .eq('space', space.id)
        .order('createdAt', { ascending: false })
        .range(startIndex, endIndex)
    }
  } else if (file) {
    if (!feedbackGive) {
      response = await supabase
        .from('comments')
        .select(
          `
                      *,
                      users (*)
                  `
        )
        .eq('file', file.id)
        .order('createdAt', { ascending: false })
        .range(startIndex, endIndex)
    } else if (space) {
      response = await supabase
        .from('comments')
        .select(
          `
                      *,
                      users (*)
                  `
        )
        .eq('file', file.id)
        .eq('space', space.id)
        .order('createdAt', { ascending: false })
        .range(startIndex, endIndex)
    }
  }
  if (!response) throw new Error('No response')
  if (response.error) throw response.error
  return response.data as CommentAndUser[]
}
