import { getMessageFiles } from './getMessageFiles'

export async function getMessageFromId(supabase: Supabase, id: string) {
  const { data, error } = await supabase
    .from('messages')
    .select('*, users(username, profile_pic_url)')
    .eq('id', id)
  if (error) throw error
  const messageAndAuthor = data[0] as MessageAndAuthor
  const fileData = await getMessageFiles(supabase, messageAndAuthor)
  const return1 = { ...messageAndAuthor, fileData }
  return return1 as MessageData
}
