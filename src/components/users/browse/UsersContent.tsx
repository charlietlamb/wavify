import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useUsersContext } from './context/usersContext'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { useResourceScroll } from '@/components/dashboard/resources/manage/hooks/useResourcesScroll'
import { getUsersQuery } from './functions/getUsersQuery'
import UsersToggle from './UsersToggle'
import Search from '@/components/toolbar/Search'
import WavifyCard from '@/components/wavify/WavifyCard'
import WavifyCardSkeletons from '@/components/wavify/WavifyCardSkeletons'
import NothingFound from '@/components/collection/NothingFound'

export default function UsersContent() {
  const { users, setUsers, query, setQuery } = useUsersContext()
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {
    data: userPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) =>
      getUsersQuery({
        pageParam,
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
      setUsers((userPages?.pages?.flat() as User[]) || [])
  }, [userPages])
  useEffect(() => {
    refetch()
  }, [query])
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
          <UsersToggle />
          <Search
            query={query}
            setQuery={setQuery}
            placeholder="Search users..."
            divClassName="flex lg:hidden w-full p-0 flex-grow"
          />
        </div>
      }
      <div
        ref={mainRef}
        className={cn(
          'grid w-full grid-cols-1 gap-4 overflow-y-auto p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          status !== 'pending' && !users.length && 'flex h-full'
        )}
      >
        {!!users.length ? (
          users.map((user) => (
            <WavifyCard
              key={user.id}
              onClick={() => router.push(`/user/${user.id}`)}
              imageUrl={user.imageUrl}
              user={user}
              name={user.username}
              text={`${formatDistanceToNow(user.createdAt)} on Wavify`}
            />
          ))
        ) : status === 'pending' ? (
          <WavifyCardSkeletons />
        ) : (
          <NothingFound text="No users found..." />
        )}
        <div className="h-px" ref={bottomRef}></div>
      </div>
    </div>
  )
}
