import Image from 'next/image'
import { UserAvatar } from '../utils/UserAvatar'
import WavifyPreviewButton from './WavifyPreviewButton'
import { useEffect, useState } from 'react'
import getFileUrlS3 from '../files/functions/getFileUrlS3'
import { getFileFromId } from '../dashboard/resources/manage/functions/getFileFromId'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Spinner from '../utils/Spinner'
import WavifyCardEllipsis from './WavifyCardEllipsis'

export default function WavifyCard({
  onClick,
  imageUrl,
  user,
  name,
  text,
  loading,
  preview = null,
  ellipsisComponent,
}: {
  onClick: () => void
  imageUrl: string
  user: User
  name: string
  text: string
  loading: boolean
  preview?: string | null
  ellipsisComponent: React.ReactNode
}) {
  const [file, setFile] = useState<FileAndSender | null>(null)
  const supabase = createClientComponentClient()
  useEffect(() => {
    async function setFileFunction() {
      if (!preview) return
      const file = await getFileFromId(supabase, preview)
      setFile({ ...file, users: user })
    }
    setFileFunction()
  })
  return (
    <div className="flex h-fit cursor-pointer flex-col gap-2" onClick={onClick}>
      <div className="relative aspect-square w-full">
        <Image
          src="https://github.com/shadcn.png"
          alt={`${name} image`}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-xl"
        />
        {!loading ? (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100">
            {preview && file && <WavifyPreviewButton file={file} />}
            <WavifyCardEllipsis ellipsisComponent={ellipsisComponent} />
          </div>
        ) : (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-black/50">
            <Spinner color="#E4E4E7" />
          </div>
        )}
      </div>
      <div className="flex max-w-full items-center gap-2 overflow-hidden">
        <UserAvatar user={user} />
        <div className="flex max-w-full flex-col overflow-hidden overflow-ellipsis">
          <h2 className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-semibold leading-none text-zinc-200">
            {name}
          </h2>
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap text-zinc-400">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}
