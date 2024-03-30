'use client'

import { useUser } from '@/state/user/useUser'
import { useEffect, useRef, useState } from 'react'
import { ResourceUploadOptions } from '../upload/data/data'
import ResourcesUploadFiles, {
  FileUploadData,
} from '../upload/files/ResourcesUploadFiles'
import { UploadContext } from '../upload/context/context'
import ResourcesUploadLeft from '../upload/ResourcesUploadLeft'
import ResourcesUploadRight from '../upload/ResourcesUploadRight'
import ResourcesUploadSubmit from '../upload/ResourcesUploadSubmit'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getUserResources } from './functions/getUserResources'
import { useResourceScroll } from './hooks/useResourcesScroll'
import Spinner from '@/components/utils/Spinner'
import ResourcesManageMap from './ResourcesManageMap'
import { ManageContext } from './context/context'
import Toolbar from '@/components/toolbar/Toolbar'
import { Bolt } from 'lucide-react'
import ResourcesManageVisibility from './ResourcesManageVisibility'
import ResourcesManageSorting from './ResourcesManageSorting'
import { Sorting, Visibility } from './data/data'

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
  const [files, setFiles] = useState<FileUploadData[]>([])
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [hasPreview, setHasPreview] = useState<boolean>(false)
  const [tagCurrent, setTagCurrent] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])
  const [type, setType] = useState<string>('')
  const [image, setImage] = useState<File | null>(null)
  const [manage, setManage] = useState<boolean>(true)
  const [id, setId] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility | null>(null)
  const [sorting, setSorting] = useState<Sorting>('newest')
  const [resources, setResources] = useState<Resource[]>([])
  const resourceRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const {
    data: resourcePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['resources'],
    queryFn: ({ pageParam = 1 }) =>
      getUserResources({ pageParam, user, visibility, sorting }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Resource[], allPages) => {
      if (lastPage?.length === 0) return undefined
      return allPages.length + 1
    },
  })

  useEffect(() => {
    if (status === 'success') setResources(resourcePages?.pages?.flat() || [])
  }, [resourcePages])
  useEffect(() => {
    refetch()
  }, [visibility, sorting])
  useResourceScroll({
    resourceRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
  })
  return (
    <ManageContext.Provider
      value={{ visibility, setVisibility, sorting, setSorting }}
    >
      <UploadContext.Provider
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
          files,
          setFiles,
          loading,
          setLoading,
          hasPreview,
          setHasPreview,
          tagCurrent,
          setTagCurrent,
          tags,
          setTags,
          type,
          setType,
          image,
          setImage,
          manage,
          setManage,
          id,
          setId,
          resources,
          setResources,
        }}
      >
        {manage ? (
          <div className="flex h-full max-h-full flex-grow divide-x divide-zinc-700">
            <Toolbar
              title="Resources"
              text="Manage your resources"
              icon={
                <Bolt
                  className="min-h-6 min-w-6 text-zinc-700"
                  strokeWidth={2}
                />
              }
              components={[
                <ResourcesManageVisibility />,
                <ResourcesManageSorting />,
              ]}
            />
            <div
              className="flex max-h-full w-full flex-grow flex-col items-center gap-4 overflow-y-auto p-4 lg:w-[80%]"
              ref={resourceRef}
            >
              <ResourcesManageMap />
              {isFetchingNextPage && <Spinner />}
              <div className="h-px w-full" ref={bottomRef} />
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-grow flex-col gap-4 p-4 lg:h-full lg:max-h-full lg:flex-row lg:items-center lg:gap-0 lg:divide-x lg:divide-zinc-700 lg:overflow-y-hidden lg:p-0">
            <ResourcesUploadFiles />
            <ResourcesUploadRight />
            <ResourcesUploadSubmit className="flex lg:hidden" />
          </div>
        )}
      </UploadContext.Provider>
    </ManageContext.Provider>
  )
}
