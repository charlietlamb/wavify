import { musicExtensions } from '@/components/chat/data/extensions'

export async function getFolderData(
  supabase: Supabase,
  folder: FolderAndSender
) {
  let size = 0
  let music = false

  async function getFolderDataRecursively(folder: FolderAndSender) {
    let files: FileAndSender[] = []

    try {
      const { data, error } = await supabase
        .from('files')
        .select('*,users(username,profile_pic_url)')
        .eq('folder', folder.id)
      if (error) throw error
      files = data as FileAndSender[]
      if (!music) {
        music = files.some((file) =>
          musicExtensions.includes(file.name.split('.').pop()!)
        )
      }
    } catch (error) {
      throw error
    }
    size += files ? files.reduce((acc, file) => acc + file.size, 0) : 0
    let folders: FolderAndSender[] = []
    try {
      const { data, error } = await supabase
        .from('folders')
        .select('*,users(username,profile_pic_url)')
        .eq('parent', folder.id)
      if (error) throw error
      folders = data as FolderAndSender[]
    } catch (error) {
      throw error
    }

    // Use Promise.all to wait for all the recursive calls to finish
    await Promise.all(
      folders.map((folder1) => getFolderDataRecursively(folder1))
    )
  }
  await getFolderDataRecursively(folder)
  return { size, music }
}
