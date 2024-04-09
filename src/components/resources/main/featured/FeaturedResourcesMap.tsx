'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getFeaturedResourcesQuery } from './functions/getFeaturedResourcesQuery'
import { useResourceScroll } from '@/components/dashboard/resources/manage/hooks/useResourcesScroll'
import WavifyCardSkeletons from '@/components/wavify/WavifyCardSkeletons'
import WavifyCard from '@/components/wavify/WavifyCard'

export default function FeaturedResourcesMap() {
  const [resources, setResources] = useState<ResourceAndUser[]>([])
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: resourcesPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['featuredResources'],
    queryFn: ({ pageParam = 1 }) => getFeaturedResourcesQuery({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success')
      setResources((resourcesPages?.pages?.flat() as ResourceAndUser[]) || [])
  }, [resourcesPages])
  useEffect(() => {
    refetch()
  }, [])
  useResourceScroll({
    resourceRef: mainRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
  })

  return (
    <div className="flex w-full flex-col divide-y divide-zinc-700">
      <div ref={mainRef} className="flex gap-2 overflow-x-auto">
        {!!resources.length ? (
          resources.map((resource) => (
            <WavifyCard
              key={resource.id}
              onClick={() => router.push(`resource/${resource.id}`)}
              imageUrl={resource.imageUrl}
              user={resource.users}
              name={resource.name}
              text={resource.users.username}
              preview={resource.previewId || null}
              ellipsisComponent={<></>}
              loading={false}
              className="w-[20%] sm:w-[16%] md:w-[14%] lg:w-[12%] xl:w-[10%] 2xl:w-[8%]"
              noEllipsis
              smallBottom
            />
          ))
        ) : (
          <WavifyCardSkeletons />
        )}
        <div className="h-px" ref={bottomRef}></div>
      </div>
    </div>
  )
}
