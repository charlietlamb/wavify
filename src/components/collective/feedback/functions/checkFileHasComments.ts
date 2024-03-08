import { Dispatch, SetStateAction } from 'react'

export async function checkFileHasComments(
  supabase: Supabase,
  file: FileAndSender,
  setComments: Dispatch<SetStateAction<CommentAndUser[]>>
) {
  const response = await supabase
    .from('comments')
    .select('*')
    .eq('file', file.id)
    .limit(1)
  if (response.error) throw response.error
  setComments(response.data as CommentAndUser[])
}
