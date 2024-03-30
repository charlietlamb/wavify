import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getMessageFiles } from './getMessageFiles'

export const getMessages = async ({
  pageParam,
  setLastFetched,
  setRecentType,
  chat,
}: {
  pageParam: number | undefined
  setLastFetched: React.Dispatch<React.SetStateAction<string>>
  setRecentType: React.Dispatch<React.SetStateAction<'new' | 'old'>>
  chat: Chat
}) => {
  if (pageParam === undefined) throw new Error('No page param')
  const supabase = createClientComponentClient()
  const startIndex = (pageParam - 1) * 25
  const endIndex = startIndex + 24
  let return1
  let return2
  try {
    const response = await supabase
      .from('messages')
      .select('*,users:author(*)')
      .eq('chat', chat.id)
      .order('createdAt', { ascending: false })
      .range(startIndex, endIndex)

    // Check if the request was successful
    if (response.error) throw response.error

    // Return the data from the response
    if (response.data.length > 0) setLastFetched(response.data[0].id)
    setRecentType('old')
    return1 = response.data
    return2 = await Promise.all(
      return1.map(async (maa: MessageAndAuthor) => {
        if (!maa.files) return { ...maa, fileData: null }
        const messageFiles = await getMessageFiles(supabase, maa)
        return { ...maa, fileData: messageFiles }
      })
    )
  } catch (error) {
    console.error(error)
    return2 = []
  } finally {
    return return2 as unknown as MessageData[]
  }
}
