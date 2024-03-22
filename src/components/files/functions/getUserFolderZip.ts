import JSZip from 'jszip'
import getFileUrlS3 from './getFileUrlS3'

export async function getUserFolderZip(
  initFolder: FolderAndSender,
  space: Space | undefined,
  supabase: Supabase
) {
  if (!space) return null
  const zip = new JSZip()
  const folderZip = zip.folder(initFolder.name)
  const { data: userFolderData, error } = await supabase
    .from('postboxes')
    .select()
    .eq('space', space.id)
    .eq('user', initFolder.id)
  if (error) throw error
  async function getFolderDataRecursively(
    folder: FolderAndSender,
    zipFolder: JSZip
  ) {
    const { data, error } = await supabase
      .from('files')
      .select('*,users(*)')
      .eq('folder', folder.id)
    if (error) throw error
    const files = data as FileAndSender[]
    for (const file of files) {
      const fileUrl = await getFileUrlS3(file.url)
      const fileDataFetch = await fetch(fileUrl)
      const fileData = await fileDataFetch.blob()
      zipFolder.file(file.name, fileData)
    }
    const { data: folderData, error: folderError } = await supabase
      .from('folders')
      .select('*,users(*)')
      .eq('parent', folder.id)
    if (folderError) throw folderError
    const folders = folderData as FolderAndSender[]
    // Use Promise.all to wait for all the recursive calls to finish
    await Promise.all(
      folders.map(async (folder1) => {
        if (zipFolder)
          await getFolderDataRecursively(
            folder1,
            zipFolder.folder(folder1.name ? folder1.name : '') || new JSZip()
          )
      })
    )
  }
  for (const folder of userFolderData) {
    const { data, error } = await supabase
      .from('folders')
      .select('*,users(*)')
      .eq('id', folder.folder)
      .single()
    if (error) throw error
    const folderData = data as FolderAndSender
    if (!folderData || !folderZip) return null
    const zipFolder = folderZip.folder(data?.name)
    if (!zipFolder) return null
    await getFolderDataRecursively(folderData, zipFolder)
  }

  const archive = await zip.generateAsync({ type: 'blob' })
  return archive
}
