import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useUser } from '@/state/user/useUser'
import { cn } from '@/lib/utils'
import { useUserContext } from '../context/context'
import { getUserActivityQuery } from './functions/getUserActivityQuery'
import { useResourceScroll } from '@/components/dashboard/resources/manage/hooks/useResourcesScroll'
import NothingFound from '@/components/collection/NothingFound'
import UserProfileActivityCard from './UserProfileActivityCard'
import UserProfileActivitySkeleton from './UserProfileActivitySkeleton'

export default function UserProfileActivityContent() {
  const { otherUser } = useUserContext()
  const [actions, setActions] = useState<Action[]>([])
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: actionsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['collectionSingle'],
    queryFn: ({ pageParam = 1 }) =>
      getUserActivityQuery({
        pageParam,
        user: otherUser,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success')
      setActions((actionsPages?.pages?.flat() as ActionAndUser[]) || [])
  }, [actionsPages])
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
    <div
      ref={mainRef}
      className={cn(
        'grid w-full grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        !actions.length && status !== 'pending' && 'flex'
      )}
    >
      {!!actions.length ? (
        actions.map((action) => (
          <UserProfileActivityCard key={action.id} action={action} />
        ))
      ) : status === 'pending' ? (
        <UserProfileActivitySkeleton />
      ) : (
        <NothingFound text="No Activity found..." />
      )}
      <div className="h-px" ref={bottomRef}></div>
    </div>
  )
}
