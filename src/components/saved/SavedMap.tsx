import { useRouter } from 'next/navigation'
import { useSavedContext } from './context/savedContext'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import WavifyCard from '../wavify/WavifyCard'
import WavifyCardSkeletons from '../wavify/WavifyCardSkeletons'
import { useUser } from '@/state/user/useUser'
import { getSavedItems } from './functions/getSavedItems'
import { useResourceScroll } from '../dashboard/resources/manage/hooks/useResourcesScroll'
import SavedSearch from './SavedSearch'
import SavedToggle from './SavedToggle'

export default function SavedMap() {
  const { items, setItems, type, sorting, query } = useSavedContext()
  const user = useUser()
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: itemsPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['savedItems'],
    queryFn: ({ pageParam = 1 }) =>
      getSavedItems({ pageParam, user, type, sorting, searchQuery: query }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success')
      setItems((itemsPages?.pages?.flat() as ItemAndUser[]) || [])
  }, [itemsPages])
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
    <div className="mb-4 flex w-full flex-col divide-y divide-zinc-700 lg:w-[80%]">
      <div className="flex gap-4 p-4">
        <SavedToggle />
        <SavedSearch />
      </div>
      <div
        ref={mainRef}
        className="grid w-full grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {!!items.length ? (
          items.map((item) => (
            <WavifyCard
              key={item.id}
              onClick={() => router.push(item.href)}
              imageUrl={item.imageUrl}
              user={item.users}
              name={item.name}
              text={item.text}
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
