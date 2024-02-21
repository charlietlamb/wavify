import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
      .order('createdAt', { ascending: false })
      .range(startIndex, endIndex)

    // Check if the request was successful
    if (response.error) {
      throw new Error(response.error.message)
    }

    // Return the data from the response
    if (response.data.length > 0) setLastFetched(response.data[0].id)
    setRecentType('old')
    return1 = response.data
  } catch {
    return1 = []
  } finally {
    return return1 as unknown as MessageAndAuthor[]
  }
}
