import { getFolderZip } from './getFolderZip'
import { Dispatch, SetStateAction } from 'react'
import { getUserFolderZip } from './getUserFolderZip'

export async function downloadFolder(
  folder: FolderAndSender,
  space: Space | undefined,
  supabase: Supabase,
  setFolderLoading: Dispatch<SetStateAction<boolean>>
) {
  //need to handle downloading user folders
  setFolderLoading(true)
  const archive =
    folder.parent === 'pb'
      ? await getUserFolderZip(folder, space, supabase)
      : await getFolderZip(folder, supabase)
  if (!archive) return
  const url = URL.createObjectURL(archive)

  // Create a link element
  const link = document.createElement('a')

  // Set the href of the link to the object URL
  link.href = url

  // Set the download attribute of the link to the desired file name
  link.download = `${folder.name}.zip`

  // Append the link to the body
  document.body.appendChild(link)

  // Simulate a click on the link
  link.click()

  // Remove the link from the body
  document.body.removeChild(link)
  setFolderLoading(false)
}
