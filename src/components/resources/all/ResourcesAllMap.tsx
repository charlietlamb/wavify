import { useResourcesContext } from './context/resourcesContext'
import { getFileSizeString } from '../../files/functions/getFileSizeString'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getResources } from './functions/getResources'
import { useEffect, useRef } from 'react'
import { useResourceScroll } from '../../dashboard/resources/manage/hooks/useResourcesScroll'
import { useRouter } from 'next/navigation'
import WavifyCard from '../../wavify/WavifyCard'
import WavifyCardSkeletons from '../../wavify/WavifyCardSkeletons'

export default function ResourcesAllMap() {
  const { resources, type, sorting, setResources, query } =
    useResourcesContext()
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
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
      getResources({ pageParam, type, sorting, searchQuery: query }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: ResourceAndUser[], allPages) => {
      if (lastPage?.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success') setResources(resourcePages?.pages?.flat() || [])
  }, [resourcePages])
  useEffect(() => {
    refetch()
  }, [type, sorting, query])
  useResourceScroll({
    resourceRef: mainRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
  })
  return (
    <div
      className="grid grid-cols-2 gap-4 overflow-y-auto p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      ref={mainRef}
    >
      {!!resources.length ? (
        resources.map((resource) => (
          <WavifyCard
            key={resource.id}
            onClick={() => router.push(`/resource/${resource.id}`)}
            imageUrl={resource.imageUrl}
            user={resource.users}
            name={resource.name}
            text={getFileSizeString(resource.size)}
            preview={resource.previewUrl || null}
            ellipsisComponent={<></>}
            loading={false}
          />
        ))
      ) : (
        <WavifyCardSkeletons />
      )}
    </div>
  )
}
