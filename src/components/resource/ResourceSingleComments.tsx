import { useInfiniteQuery } from '@tanstack/react-query'
import { useResourceContext } from './context/resourceContext'
import { getResourceComments } from './functions/getResourceComments'
import { useEffect, useRef, useState } from 'react'
import { UserAvatar } from '../utils/UserAvatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'
import { handleResourceCommentSend } from './functions/handleResourceCommentSend'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useUser } from '@/state/user/useUser'
import { formatDistanceToNow } from 'date-fns'
import Spinner from '../utils/Spinner'
import { useResourceScroll } from '../dashboard/resources/manage/hooks/useResourcesScroll'

export default function ResourceSingleComments() {
  const supabase = createClientComponentClient()
  const user = useUser()
  const { resource } = useResourceContext()
  const [comments, setComments] = useState<CommentAndUser[]>([])
  const [commentInput, setCommentInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const {
    data: commentPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam = 1 }) =>
      getResourceComments({ pageParam, resource }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: CommentAndUser[], allPages) => {
      if (lastPage?.length === 0) return undefined
      return allPages.length + 1
    },
  })
  useEffect(() => {
    if (status === 'success')
      setComments(commentPages.pages.flat().map((comment) => comment))
  }, [status, commentPages])

  useResourceScroll({
    resourceRef: mainRef,
    bottomRef,
    loadMore: fetchNextPage,
    shouldLoadMore: hasNextPage && !isFetchingNextPage,
  })
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-zinc-700 p-2 transition hover:border-zinc-200">
      <h3 className="text-lg font-bold">Comments</h3>
      <div
        className="flex max-h-[250px] flex-col items-center gap-2 overflow-y-auto"
        ref={mainRef}
      >
        {comments.map((comment) => (
          <div key={comment.id} className="flex w-full flex-shrink-0 gap-4">
            <UserAvatar user={comment.users} />
            <div className="flex w-full flex-col">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm font-medium">{comment.users.username}</p>
                <p className="text-xs text-zinc-400">
                  {formatDistanceToNow(new Date(comment.createdAt))} ago
                </p>
              </div>
              <p className="text-sm text-zinc-400">{comment.message}</p>
            </div>
          </div>
        ))}
        {isFetchingNextPage && <Spinner />}
        <div className="h-px" ref={bottomRef}></div>
      </div>
      <div className="flex gap-4">
        <Input
          className="flex-grow border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
          placeholder="Comment"
          type="text"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button
          variant="zinc"
          onClick={() =>
            handleResourceCommentSend(
              supabase,
              resource,
              user,
              commentInput,
              setCommentInput,
              refetch
            )
          }
        >
          <Send />
        </Button>
      </div>
    </div>
  )
}
