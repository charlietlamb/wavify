import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import WavifyCard from '../wavify/WavifyCard'
import WavifyCardSkeletons from '../wavify/WavifyCardSkeletons'
import { useUser } from '@/state/user/useUser'
import { useResourceScroll } from '../dashboard/resources/manage/hooks/useResourcesScroll'
import { getUserChatsQuery } from './functions/getUserChatsQuery'
import { useMessagesContext } from './context/messagesContext'
import MessagesChat from './MessagesChat'
import MessagesChatSkeleton from './MessagesChatSkeleton'

export default function MessagesChatMap() {
  const { chats, setChats, query } = useMessagesContext()
  const user = useUser()
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
    queryKey: ['userChats'],
    queryFn: ({ pageParam = 1 }) =>
      getUserChatsQuery({ pageParam, user, searchQuery: query }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success')
      setChats((itemsPages?.pages?.flat() as ChatAndUser[]) || [])
  }, [itemsPages])
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
    <div ref={mainRef} className="flex w-full flex-col gap-4 overflow-y-auto">
      {!!chats.length ? (
        chats.map((chat) => <MessagesChat chat={chat} />)
      ) : (
        <MessagesChatSkeleton />
      )}
      <div className="h-px" ref={bottomRef}></div>
    </div>
  )
}
