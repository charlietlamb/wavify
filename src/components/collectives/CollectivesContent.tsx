import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import WavifyCard from '../wavify/WavifyCard'
import WavifyCardSkeletons from '../wavify/WavifyCardSkeletons'
import { useUser } from '@/state/user/useUser'
import { useResourceScroll } from '../dashboard/resources/manage/hooks/useResourcesScroll'
import { getCollectivesQuery } from './functions/getCollectivesQuery'
import { useCollectivesContext } from './context/collectivesContext'
import Search from '../toolbar/Search'
import CollectivesToggle from './CollectivesToggle'
import { cn } from '@/lib/utils'
import NothingFound from '../collection/NothingFound'

export default function CollectivesContent() {
  const { collectives, setCollectives, sorting, query, setQuery } =
    useCollectivesContext()
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: collectivePages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['collectives'],
    queryFn: ({ pageParam = 1 }) =>
      getCollectivesQuery({
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
      setCollectives(
        (collectivePages?.pages?.flat() as CollectiveAndUser[]) || []
      )
  }, [collectivePages])
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
          <CollectivesToggle />
          <Search
            query={query}
            setQuery={setQuery}
            placeholder="Search collectives..."
            divClassName="flex lg:hidden w-full p-0 flex-grow"
          />
        </div>
      }
      <div
        ref={mainRef}
        className={cn(
          'grid w-full grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          status !== 'pending' && !collectives.length && 'flex h-full'
        )}
      >
        {!!collectives.length ? (
          collectives.map((collective) => (
            <WavifyCard
              key={collective.id}
              onClick={() => router.push(`/collective/${collective.id}`)}
              imageUrl={collective.imageUrl || collective.users.imageUrl}
              user={collective.users}
              name={collective.unique}
              text={`By ${collective.users.username}`}
            />
          ))
        ) : status === 'pending' ? (
          <WavifyCardSkeletons />
        ) : (
          <NothingFound text="No collectives found..." />
        )}
        <div className="h-px" ref={bottomRef}></div>
      </div>
    </div>
  )
}
