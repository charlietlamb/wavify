import { Dispatch, SetStateAction } from 'react'

export async function setUserFiles(
  supabase: Supabase,
  user: User,
  setFiles: Dispatch<SetStateAction<FileAndSender[]>>
) {
  const { data, error } = await supabase
    .from('files')
    .select('*,users(*)')
    .eq('user', user.id)
  if (error) throw error
  setFiles(data as FileAndSender[])
}
