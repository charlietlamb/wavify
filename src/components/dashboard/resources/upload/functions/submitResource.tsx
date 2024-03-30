import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { UploadContext } from '../context/context'
import { Ban } from 'lucide-react'
import { fileToBase64 } from '@/components/modals/functions/fileToBase64'
import { uploadFileToS3 } from '@/components/modals/modal-actions/uploadFile'

export default async function submitResource(
  supabase: Supabase,
  user: User,
  context: UploadContext,
  draft: boolean
) {
  if (!context.name && !draft) {
    context.setError('Name is required')
    toast('Upload Error', { icon: <Ban />, description: 'Name is required' })
    return false
  }
  if (!context.description && !draft) {
    context.setError('Description is required')
    toast('Upload Error', {
      icon: <Ban />,
      description: 'Description is required',
    })
    return false
  }
  if (context.files.length === 0 && !draft) {
    context.setError('Files are required to upload a resource.')
    toast('Upload Error', {
      icon: <Ban />,
      description: 'Files are required to upload resource.',
    })
    return false
  }
  if (!context.type && !draft) {
    context.setError('A type is required to upload a resource.')
    toast('Upload Error', {
      icon: <Ban />,
      description: 'A type is required to upload a resource.',
    })
    return false
  }
  let imageUrl = user.imageUrl
  if (context.image) {
    const base64Image = await fileToBase64(context.image)
    if (!base64Image) throw new Error('Error obtaining base64 data')
    let url = `${user.id}/${uuidv4()}`
    let name = context.image.name
    const error = await uploadFileToS3(
      base64Image,
      context.image.type,
      url,
      name
    )
    if (error) throw new Error('Error uploading image to S3')
    imageUrl = `${user.id}/${name}`
  }
  context.setLoading(true)
  context.setError('')
  const resourceFolder = {
    id: uuidv4(),
    parent: null,
    user: user.id,
    name: context.name,
  }
  let previewUrl = ''
  let previewId = ''
  let fileIds = []
  let size = 0
  const { error: folderError } = await supabase
    .from('folders')
    .insert(resourceFolder)
  if (folderError) throw folderError
  for (const file of context.files) {
    var fileId = uuidv4()
    var ext = file.name.split('.').pop()
    var url = `${user.id}/${fileId}.${ext ? ext : ''}`
    fileIds.push(fileId)
    size += file.file.size / 1024 / 1024
    if (file.preview) {
      previewUrl = url
      previewId = fileId
    }
    const base64File = await fileToBase64(file.file)
    if (!base64File) throw new Error('Error obtaining base64 data')
    const error = await uploadFileToS3(
      base64File,
      file.file.type,
      url,
      file.name
    )
    if (error) {
      throw new Error('Error uploading file to S3')
    } else {
      const fileToAdd = {
        id: fileId,
        user: user.id,
        name: file.name,
        size: file.file.size / 1024 / 1024,
        folder: resourceFolder.id,
        system: false,
        url,
      }
      const { error: fileError } = await supabase
        .from('files')
        .insert(fileToAdd)
      if (fileError) throw fileError
    }
  }
  let id = context.id || uuidv4()
  const resource = {
    id,
    user: user.id,
    name: context.name,
    description: context.description,
    collaborators: Array.from(
      new Set([
        user.id,
        ...context.collaborators.map((collab: User) => collab.id),
      ])
    ),
    friendsOnly: context.options.friendsOnly,
    mustFollow: context.options.mustFollow,
    allowSave: context.options.allowSave,
    allowDownload: context.options.allowDownload,
    fileIds,
    folder: resourceFolder.id,
    imageUrl,
    tags: context.tags,
    type: context.type,
    previewUrl,
    previewId: previewId === '' ? null : previewId,
    size,
    draft,
  }
  if (context.id) {
    const { error: resourceError } = await supabase
      .from('resources')
      .update(resource)
      .eq('id', context.id)
    if (resourceError) throw resourceError
  } else {
    const { error: resourceError } = await supabase
      .from('resources')
      .insert(resource)
    if (resourceError) throw resourceError
  }
  context.setLoading(false)
  return id
}
