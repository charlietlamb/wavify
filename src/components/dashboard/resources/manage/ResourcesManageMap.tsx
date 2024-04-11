import { Pencil, Upload } from 'lucide-react'
import { useUploadContext } from '../upload/context/context'
import { useRouter } from 'next/navigation'
import WavifyCard from '@/components/wavify/WavifyCard'
import { getFileSizeString } from '@/components/files/functions/getFileSizeString'
import { handleEdit } from './functions/handleEdit'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/state/user/useUser'
import { useState } from 'react'
import ResourceEllipsisComponent from './ResourceEllipsisComponent'

export default function ResourcesManageMap() {
  const { resources, setId, setManage } = useUploadContext()
  const supabase = createClientComponentClient()
  const uploadContext = useUploadContext()
  const user = useUser()
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string>('')
  if (!resources || !setId || !setManage) return null

  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {resources.map((resource: Resource) => (
        <WavifyCard
          key={resource.id}
          user={user}
          name={resource.name}
          text={getFileSizeString(resource.size)}
          imageUrl={resource.imageUrl}
          onClick={() =>
            handleEdit(resource, uploadContext, setLoadingId, supabase)
          }
          preview={resource.previewId}
          ellipsisComponent={
            <ResourceEllipsisComponent
              resource={resource}
              setLoadingId={setLoadingId}
            />
          }
        />
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
