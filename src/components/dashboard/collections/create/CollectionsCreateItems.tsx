import { getSavedItems } from '@/components/saved/functions/getSavedItems'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'
import { useResourceScroll } from '../../resources/manage/hooks/useResourcesScroll'
import { useUser } from '@/state/user/useUser'
import CollectionsCreateItemsSkeleton from './CollectionsCreateItemsSkeleton'
import CollectionsCreateItem from './CollectionsCreateItem'
import Spinner from '@/components/utils/Spinner'

export default function CollectionsCreateItems() {
  const {
    items,
    setItems,
    query,
    selected,
    isFetchingItems,
    setIsFetchingItems,
  } = useCollectionsCreateContext()
  const router = useRouter()
  const selectedIds = `(${selected.map((item) => item.saved).join(',')})`
  const user = useUser()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: itemPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['createCollections'],
    queryFn: ({ pageParam = 1 }) =>
      getSavedItems({
        pageParam,
        user,
        type: null,
        sorting: 'newest',
        searchQuery: query,
        selectedIds,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    setIsFetchingItems(isFetchingNextPage)
  }, [isFetchingNextPage])
  useEffect(() => {
    if (status === 'success') {
      console.log(
        itemPages?.pages
          ?.flat()
          .filter((item): item is ItemAndUser => item !== undefined) || []
      )
      setItems(
        itemPages?.pages
          ?.flat()
          .filter((item): item is ItemAndUser => item !== undefined) || []
      )
    }
  }, [itemPages])
  useEffect(() => {
    refetch()
  }, [query, selectedIds])
  useResourceScroll({
    resourceRef: mainRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
  })
  return (
    <div
      className="flex flex-shrink-0 flex-grow flex-col divide-y divide-zinc-700 overflow-hidden overflow-y-auto overflow-ellipsis"
      ref={mainRef}
    >
      <h3 className="flex items-center justify-between p-2 font-semibold">
        <span>Saved</span>
        {isFetchingNextPage && <Spinner color="#E4E4E7" />}
      </h3>
      <div className="flex flex-col gap-4 p-2">
        {!!items.length ? (
          items.map((item: Item) => (
            <CollectionsCreateItem key={item.id} item={item} />
          ))
        ) : (
          <CollectionsCreateItemsSkeleton />
        )}
      </div>
    </div>
  )
}
