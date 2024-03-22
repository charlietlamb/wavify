import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { ResourceUploadContext } from '../context/context'
import { Ban } from 'lucide-react'
import { FileUploadData } from '../files/ResourcesUploadFiles'
import { fileToBase64 } from '@/components/modals/functions/fileToBase64'
import { uploadFileToS3 } from '@/components/modals/modal-actions/uploadFile'

export default async function submitResource(
  supabase: Supabase,
  user: User,
  context: ResourceUploadContext
) {
  console.log('0')
  if (!context.name) {
    context.setError('Name is required')
    toast('Upload Error', { icon: <Ban />, description: 'Name is required' })
    return
  }
  if (!context.description) {
    context.setError('Description is required')
    toast('Upload Error', {
      icon: <Ban />,
      description: 'Description is required',
    })
    return
  }
  if (context.files.length === 0) {
    context.setError('Files are required to upload resource.')
    toast('Upload Error', {
      icon: <Ban />,
      description: 'Files are required to upload resource.',
    })
    return
  }
  context.setLoading(true)
  context.setError('')
  const fileUrls = []
  const resourceFolder = {
    id: uuidv4(),
    parent: null,
    user: user.id,
    name: context.name,
  }
  console.log('1')
  let previewUrl = ''
  const { error: folderError } = await supabase
    .from('folders')
    .insert(resourceFolder)
  if (folderError) throw folderError
  for (const file of context.files) {
    console.log('2.21')
    var fileId = uuidv4()
    var ext = file.name.split('.').pop()
    var url = `${user.id}/${fileId}.${ext ? ext : ''}`
    fileUrls.push(url)
    if (file.preview) previewUrl = url
    const base64File = await fileToBase64(file.file)
    if (!base64File) throw new Error('Error obtaining base64 data')
    const error = await uploadFileToS3(
      base64File,
      file.file.type,
      url,
      file.name
    )
    console.log('2.22')
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
  console.log('2')
  const resource = {
    user: user.id,
    name: context.name,
    description: context.description,
    collaborators: context.collaborators.map((collab: User) => collab.id),
    friendsOnly: context.options.friendsOnly,
    mustFollow: context.options.mustFollow,
    allowSave: context.options.allowSave,
    allowDownload: context.options.allowDownload,
    fileUrls: fileUrls,
    folder: resourceFolder.id,
    imageUrl: context.imageUrl || user.profile_pic_url,
    previewUrl,
  }
  const { error: resourceError } = await supabase
    .from('resources')
    .insert(resource)
  if (resourceError) throw resourceError
  context.setLoading(false)
  console.log('3')
}
