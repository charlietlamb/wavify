import { v4 as uuidv4 } from 'uuid'
import { toast } from 'sonner'
import { Ban } from 'lucide-react'
import { fileToBase64 } from '@/components/modals/functions/fileToBase64'
import { uploadFileToS3 } from '@/components/modals/modal-actions/uploadFile'
import { CollectionsCreateContext } from '../context/collectionsCreateContext'
import { getCollectionItems } from './getCollectionItems'
import { deleteCollectionItem } from './deleteCollectionItem'
import { addCollectionItem } from './addCollectionItem'
import { addCollectionItems } from './addCollectionItems'

export default async function submitCollection(
  supabase: Supabase,
  user: User,
  context: CollectionsCreateContext,
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
  let id = context.id || uuidv4()
  const collection = {
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
    imageUrl,
    tags: context.tags,
    draft,
  }
  if (context.id) {
    const { error: collectionError } = await supabase
      .from('collections')
      .update(collection)
      .eq('id', context.id)
    if (collectionError) throw collectionError
    const currentItems = await getCollectionItems(supabase, context.id)
    for (const item of currentItems) {
      if (!context.selected.some((i) => i.saved === item.saved)) {
        await deleteCollectionItem(supabase, item.id)
      }
    }
    for (const item of context.selected) {
      if (!currentItems.some((i) => i.saved === item.saved)) {
        await addCollectionItem(supabase, context.id, item)
      }
    }
  } else {
    const { error: collectionError } = await supabase
      .from('collections')
      .insert(collection)
    if (collectionError) throw collectionError
    await addCollectionItems(supabase, id, context.selected)
  }
  context.setLoading(false)
  return id
}
