import JSZip from 'jszip'
import getFileUrlS3 from './getFileUrlS3'

export async function getFolderZip(
  initFolder: FolderAndSender,
  supabase: Supabase
) {
  const zip = new JSZip()
  if (!zip) return
  const folderZip = zip.folder(initFolder.name)
  async function getFolderDataRecursively(
    folder: FolderAndSender,
    zipFolder: JSZip
  ) {
    const { data, error } = await supabase
      .from('files')
      .select('*,users(username,profile_pic_url)')
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
      .select('*,users(username,profile_pic_url)')
      .eq('parent', folder.id)
    if (folderError) throw folderError
    const folders = folderData as FolderAndSender[]

    // Use Promise.all to wait for all the recursive calls to finish
    await Promise.all(
      folders.map(async (folder1) => {
        if (folderZip)
          await getFolderDataRecursively(
            folder1,
            folderZip.folder(folder1.name ? folder1.name : '') || new JSZip()
          )
      })
    )
  }
  if (folderZip) await getFolderDataRecursively(initFolder, folderZip)

  const archive = await zip.generateAsync({ type: 'blob' })
  return archive
}
