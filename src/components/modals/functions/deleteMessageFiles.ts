import { deleteFileFromS3 } from '../modal-actions/deleteFile'

export async function deleteMessageFiles(
  supabase: Supabase,
  message: MessageData
) {
  const { data, error } = await supabase
    .from('files')
    .select()
    .eq('message', message.id)
  if (error) throw error
  await Promise.all(
    data?.map(async (file: FileData) => {
      const { error } = await supabase
        .from('files')
        .update({ ...file, deleted: true })
        .eq('id', file.id)
      if (error) throw error
      deleteFileFromS3(file.url)
    })
  )
}
