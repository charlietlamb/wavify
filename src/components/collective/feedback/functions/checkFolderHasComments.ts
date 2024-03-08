import { Dispatch, SetStateAction } from 'react'

export async function checkFolderHasComments(
  supabase: Supabase,
  folder: FolderAndSender,
  setComments: Dispatch<SetStateAction<CommentAndUser[]>>
) {
  const response = await supabase
    .from('comments')
    .select('*')
    .eq('folder', folder.id)
    .limit(1)
  if (response.error) throw response.error
  setComments(response.data as CommentAndUser[])
}
