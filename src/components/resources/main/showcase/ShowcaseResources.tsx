'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { showcaseData } from './showcaseData'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getFileAndSender } from './functions/getFileAndSender'
import ShowcaseResourcesContent from './ShowcaseResourcesContent'
import { ShowcaseResourceContext } from './context/showcaseResourceContext'
import { getResourceAndUserFromId } from './functions/getResourceAndUserFromId'

export default function ShowcaseResources() {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<FileAndSender | null>(null)
  const [resource, setResource] = useState<ResourceAndUser | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function getData() {
      const resource = await getResourceAndUserFromId(supabase, showcaseData)
      setResource(resource)
      setFile(await getFileAndSender(supabase, resource.previewId))
    }
    getData()
  }, [])
  return (
    <div className="relative flex w-full flex-col py-8">
      <Image
        alt={`Wavify showcase image`}
        src={'https://github.com/shadcn.png'} //otherUser.imageUrl}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      ></Image>

      <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-black/50 via-transparent via-50% to-black/50"></div>
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-black/50 via-black via-90% to-black"></div>
      {file && resource && (
        <ShowcaseResourceContext.Provider
          value={{ file, resource, loading, setLoading }}
        >
          <ShowcaseResourcesContent />
        </ShowcaseResourceContext.Provider>
      )}
    </div>
  )
}
