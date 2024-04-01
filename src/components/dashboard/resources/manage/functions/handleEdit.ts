import { getUserFromId } from '@/components/files/functions/getUserFromId'
import { UploadContext } from '../../upload/context/context'
import { FileUploadData } from '../../upload/files/ResourcesUploadFiles'
import getFileUrlS3 from '@/components/files/functions/getFileUrlS3'
import { getFileFromId } from './getFileFromId'
import { Dispatch, SetStateAction } from 'react'

export async function handleEdit(
  resource: Resource,
  uploadContext: UploadContext,
  setLoadingId: Dispatch<SetStateAction<string>>,
  supabase: Supabase
) {
  if (!uploadContext.setId || !uploadContext.setManage)
    throw new Error('setId or setManage not defined')
  setLoadingId(resource.id)
  uploadContext.setName(resource.name)
  uploadContext.setDescription(resource.description)
  const collaborators = await Promise.all(
    resource.collaborators.map(async (c) => {
      return await getUserFromId(supabase, c)
    })
  )
  uploadContext.setCollaborators(collaborators)
  uploadContext.setOptions({
    friendsOnly: resource.friendsOnly,
    mustFollow: resource.mustFollow,
    allowSave: resource.allowSave,
    allowDownload: resource.allowDownload,
  })
  uploadContext.setTags(resource.tags)
  uploadContext.setType(resource.type)
  const fileData = await Promise.all(
    resource.fileIds.map((f) => getFileFromId(supabase, f))
  )
  const files: FileUploadData[] = await Promise.all(
    fileData.map(async (f) => {
      const fileUrl = await getFileUrlS3(f.url)
      const fileDataFetch = await fetch(fileUrl)
      const blob = await fileDataFetch.blob()
      const fileFile = new File([blob], f.name)
      const file = {
        file: fileFile,
        name: f.name,
        preview: f.url === resource.previewUrl,
      }
      return file
    })
  )
  uploadContext.setFiles(files)
  uploadContext.setHasPreview(files.some((f) => f.preview))
  uploadContext.setId(resource.id)
  setLoadingId('')
  uploadContext.setManage(false)
}
