import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import WavifyCard from '../wavify/WavifyCard'
import WavifyCardSkeletons from '../wavify/WavifyCardSkeletons'
import { useUser } from '@/state/user/useUser'
import { useResourceScroll } from '../dashboard/resources/manage/hooks/useResourcesScroll'
import { getCollectionsQuery } from './functions/getCollectionsQuery'
import { useCollectionsContext } from './context/collectionsContext'
import Search from '../toolbar/Search'
import CollectionsToggle from './CollectionsToggle'
import NothingFound from '../collection/NothingFound'
import { cn } from '@/lib/utils'

export default function CollectionsContent() {
  const { collections, setCollections, sorting, query, setQuery } =
    useCollectionsContext()
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: collectionPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['collections'],
    queryFn: ({ pageParam = 1 }) =>
      getCollectionsQuery({
        pageParam,
        sorting,
        searchQuery: query,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success')
      setCollections(
        (collectionPages?.pages?.flat() as CollectionAndUser[]) || []
      )
  }, [collectionPages])
  useEffect(() => {
    refetch()
  }, [sorting, query])
  useResourceScroll({
    resourceRef: mainRef,
    bottomRef,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    loadMore: fetchNextPage,
  })

  return (
    <div className="flex w-full flex-col">
      {
        <div className="flex gap-4 p-4 pb-0">
          <CollectionsToggle />
          <Search
            query={query}
            setQuery={setQuery}
            placeholder="Search collections..."
            divClassName="flex lg:hidden w-full p-0 flex-grow"
          />
        </div>
      }
      <div
        ref={mainRef}
        className={cn(
          'grid w-full grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          status !== 'pending' && !collections.length && 'flex h-full'
        )}
      >
        {!!collections.length ? (
          collections.map((collection) => (
            <WavifyCard
              key={collection.id}
              onClick={() => router.push(`/collection/${collection.id}`)}
              imageUrl={collection.imageUrl}
              user={collection.users}
              name={collection.name}
              text={collection.description}
            />
          ))
        ) : status === 'pending' ? (
          <WavifyCardSkeletons />
        ) : (
          <NothingFound text="No collections found..." />
        )}
        <div className="h-px" ref={bottomRef}></div>
      </div>
    </div>
  )
}
