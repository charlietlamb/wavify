import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import WavifyCard from '../wavify/WavifyCard'
import WavifyCardSkeletons from '../wavify/WavifyCardSkeletons'
import { useUser } from '@/state/user/useUser'
import { useResourceScroll } from '../dashboard/resources/manage/hooks/useResourcesScroll'
import { useCollectionContext } from './context/collectionContext'
import { getSavedItems } from '../saved/functions/getSavedItems'
import NothingFound from './NothingFound'
import { cn } from '@/lib/utils'
import { getCollectionItemsQuery } from './functions/getCollectionItemsQuery'
import CollectionSingleButtons from './CollectionSingleButtons'

export default function CollectionSingleMap() {
  const { collection, items, setItems, type, sorting, query } =
    useCollectionContext()
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
    queryKey: ['collectionSingle'],
    queryFn: ({ pageParam = 1 }) =>
      getCollectionItemsQuery({
        pageParam,
        user,
        type,
        sorting,
        searchQuery: query,
        collection: collection.id,
      }),
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
    <div
      ref={mainRef}
      className={cn(
        'grid w-full grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        !items.length && status !== 'pending' && 'flex'
      )}
    >
      <CollectionSingleButtons bottom />
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
      ) : status === 'pending' ? (
        <WavifyCardSkeletons />
      ) : (
        <NothingFound />
      )}
      <div className="h-px" ref={bottomRef}></div>
    </div>
  )
}
