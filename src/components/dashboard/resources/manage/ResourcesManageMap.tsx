import Image from 'next/image'
import { getFileSizeString } from '@/components/files/functions/getFileSizeString'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Upload } from 'lucide-react'
import { FaEllipsis } from 'react-icons/fa6'
import { useUploadContext } from '../upload/context/context'
import { getUserFromId } from '@/components/files/functions/getUserFromId'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFileFromId } from './functions/getFileFromId'
import getFileUrlS3 from '@/components/files/functions/getFileUrlS3'
import { FileUploadData } from '../upload/files/ResourcesUploadFiles'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Spinner from '@/components/utils/Spinner'
import { menuButtonClassName } from '@/components/nav/FloatingMenu'

export default function ResourcesManageMap() {
  const supabase = createClientComponentClient()
  const { resources, setId, setManage } = useUploadContext()
  const router = useRouter()
  if (!resources || !setId || !setManage) return null
  const uploadContext = useUploadContext()
  const [loadingId, setLoadingId] = useState<string>('')
  const [loadingDeleteId, setLoadingDeleteId] = useState<string>('')
  async function handleEdit(resource: Resource) {
    if (!setId || !setManage) throw new Error('setId or setManage not defined')
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
    uploadContext.setImageUrl(resource.imageUrl)
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
    setId(resource.id)
    setLoadingId('')
    setManage(false)
  }
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {resources.map((resource: Resource) => (
        <div
          className="flex flex-col gap-4 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200"
          key={resource.id}
        >
          <div className="relative aspect-square w-full">
            <Image
              src="https://github.com/shadcn.png"
              alt={`${resource.name} image`}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex w-full flex-grow flex-col overflow-hidden">
              <h2 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold leading-none text-zinc-200">
                {resource.name}
              </h2>
              <p className="text-zinc-400">
                {getFileSizeString(resource.size)}
              </p>
            </div>
            <Popover>
              <PopoverTrigger>
                <Button variant="zinc_outline" className="flex-shrink-0">
                  <FaEllipsis />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <button
                  onClick={() => handleEdit(resource)}
                  className={menuButtonClassName}
                >
                  Edit
                  {loadingId === resource.id ? (
                    <Spinner className="text-zinc-200" />
                  ) : (
                    <Pencil className="min-h-2 min-w-2 text-zinc-400" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(resource)}
                  className={menuButtonClassName}
                >
                  Delete
                  {loadingDeleteId === resource.id ? (
                    <Spinner className="text-zinc-200" />
                  ) : (
                    <Trash2 className="min-h-2 min-w-2 text-zinc-400" />
                  )}
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
      <div
        className="flex cursor-pointer flex-col items-center justify-center gap-4 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200 "
        onClick={() => router.push('/dashboard/resources/upload')}
      >
        <p className="max-w-[75%] text-center text-2xl font-bold text-zinc-200">
          Upload New Resource
        </p>
        <Upload className="min-h-10 min-w-10" />
      </div>
    </div>
  )
}
