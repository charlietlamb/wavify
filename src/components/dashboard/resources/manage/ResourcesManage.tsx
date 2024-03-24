'use client'

import { useUser } from '@/state/user/useUser'
import { useEffect, useRef, useState } from 'react'
import { ResourceUploadOptions } from '../upload/data/data'
import ResourcesUploadFiles, {
  FileUploadData,
} from '../upload/files/ResourcesUploadFiles'
import { ResourceUploadContext } from '../upload/context/context'
import { ResourceManageContext } from './context/context'
import ResourcesUploadLeft from '../upload/ResourcesUploadLeft'
import ResourcesUploadRight from '../upload/ResourcesUploadRight'
import ResourcesUploadSubmit from '../upload/ResourcesUploadSubmit'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserResources } from './functions/getUserResources'
import { useResourceScroll } from './hooks/useResourcesScroll'
import Spinner from '@/components/utils/Spinner'
import ResourcesManageMap from './ResourcesManageMap'

export default function ResourcesUpload() {
  const user = useUser()
  const [name, setName] = useState<string>(`${user.username}'s resource`)
  const [description, setDescription] = useState<string>('')
  const [collaborators, setCollaborators] = useState<User[]>([])
  const [options, setOptions] = useState<ResourceUploadOptions>({
    friendsOnly: false,
    mustFollow: false,
    allowSave: true,
    allowDownload: true,
  })
  const [imageUrl, setImageUrl] = useState<string>('')
  const [files, setFiles] = useState<FileUploadData[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hasPreview, setHasPreview] = useState<boolean>(false)
  const [manage, setManage] = useState<boolean>(true)
  const [id, setId] = useState<string>('')
  const [resources, setResources] = useState<Resource[]>([])
  const resourceRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: resourcePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['resources'],
    queryFn: ({ pageParam = 1 }) => getUserResources({ pageParam, user }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Resource[], allPages) => {
      if (lastPage?.length === 0) return undefined
      return allPages.length + 1
    },
  })

  useEffect(() => {
    console.log(status)
    if (status === 'success') setResources(resourcePages?.pages?.flat() || [])
  }, [resourcePages])
  useResourceScroll({
    resourceRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
  })
  return (
    <ResourceManageContext.Provider
      value={{
        manage,
        setManage,
        id,
        setId,
        resources,
        setResources,
      }}
    >
      <ResourceUploadContext.Provider
        value={{
          name,
          setName,
          description,
          setDescription,
          collaborators,
          setCollaborators,
          options,
          setOptions,
          error,
          setError,
          imageUrl,
          setImageUrl,
          files,
          setFiles,
          loading,
          setLoading,
          hasPreview,
          setHasPreview,
        }}
      >
        {manage ? (
          <div
            className="flex h-full w-full flex-col items-center gap-4 overflow-y-auto rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200"
            ref={resourceRef}
          >
            <ResourcesManageMap />
            {isFetchingNextPage && <Spinner />}
            <div className="h-[1-xp] w-full" ref={bottomRef} />
          </div>
        ) : (
          <div className="flex h-full w-full flex-col gap-4 overflow-y-auto lg:flex-row lg:overflow-y-hidden">
            <ResourcesUploadFiles />
            <ResourcesUploadLeft />
            <ResourcesUploadRight />
            <ResourcesUploadSubmit className="flex lg:hidden" />
          </div>
        )}
      </ResourceUploadContext.Provider>
    </ResourceManageContext.Provider>
  )
}
