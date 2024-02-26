import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getMessageFiles } from './getMessageFiles'

export const getFiles = async ({
  pageParam,
  setLastFetchedFiles,
  setRecentTypeFiles,
  chat,
}: {
  pageParam: number | undefined
  setLastFetchedFiles: React.Dispatch<React.SetStateAction<string>>
  setRecentTypeFiles: React.Dispatch<React.SetStateAction<'new' | 'old'>>
  chat: Chat
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 25
  const endIndex = startIndex + 24
  let return1
  try {
    const response = await supabase
      .from('messages')
      .select(
        `
            *,
            users ( username, profile_pic_url)
        `
      )
      .eq('chat', chat.id)
      .not('files', 'is', false)
      .order('createdAt', { ascending: false })
      .range(startIndex, endIndex)
    // Check if the request was successful
    if (response.error) {
      throw new Error(response.error.message)
    }

    // Return the data from the response
    if (response.data.length > 0) setLastFetchedFiles(response.data[0].id)
    setRecentTypeFiles('old')
    return1 = await Promise.all(
      response.data.map(async (maa: MessageAndAuthor) => {
        if (!maa.files) return { ...maa, fileData: null }
        const messageFiles = await getMessageFiles(supabase, maa)
        return { ...maa, fileData: messageFiles }
      })
    )
  } catch {
    return1 = []
  } finally {
    return return1 as unknown as MessageData[]
  }
}
