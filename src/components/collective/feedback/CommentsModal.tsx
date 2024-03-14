'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModal } from '../../../../hooks/use-modal-store'
import { useUser } from '@/state/user/useUser'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getComments } from './functions/getComments'
import Comment from './Comment'
import Spinner from '@/components/utils/Spinner'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { Check, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ChatInputSkeleton from '@/components/chat/ChatInputSkeleton'
import { useCommentUpdateEffect } from './hooks/useCommentUpdateEffect'

export const CommentsModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const { space, folder, file, title, feedbackGive } = data as {
    space?: Space
    folder?: FolderAndSender
    file?: FileAndSender
    title?: string
    feedbackGive?: boolean
  }

  const isModalOpen = isOpen && type === 'comments'
  const supabase = createClientComponentClient()
  const [render, setRender] = useState<CommentAndUser[]>([])
  const [comment, setComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const user = useUser()
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['comments'],
    queryFn: ({ pageParam = 1 }) =>
      getComments({ pageParam, file, folder, space, feedbackGive }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: CommentAndUser[], allPages) => {
      if (lastPage?.length === 0) return undefined
      return allPages.length + 1
    },
    enabled: isModalOpen,
  })

  const onClick = async () => {
    if (!space || !comment) return
    setIsLoading(true)
    let toInsert = {
      user: user.id,
      space: space.id,
      message: comment,
      folder: null,
      file: null,
    } as CommentType
    if (folder) {
      toInsert = { ...toInsert, folder: folder.id }
    } else if (file) {
      toInsert = { ...toInsert, file: file.id }
    }
    const { error } = await supabase.from('comments').insert(toInsert)
    if (error) throw error
    const descMessage = `${file ? file.users.username : folder ? folder.users.username : 'The recipient'} has been notified.`
    toast('Comment added', {
      icon: <Check className="mr-2" />,
      description: descMessage,
    })
    setIsLoading(false)
    refetch()
    setComment('')
  }

  useEffect(() => {
    if (comments?.pages) {
      setRender(comments.pages.flat())
    }
  }, [comments])

  const observer = useRef<IntersectionObserver | null>(null)

  const bottomRef = useCallback(
    (node: Element | null) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  )

  useCommentUpdateEffect(supabase, user, file, folder, render, refetch)
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0">
        <DialogHeader className="px-6 pt-4">
          <DialogTitle className="text-left text-2xl font-bold">
            {title ? title : 'Comments'}
          </DialogTitle>
        </DialogHeader>
        {
          <div className="flex max-h-[50vh] flex-col gap-y-2 overflow-y-auto px-6">
            {!!render.length ? (
              render.map((comment) => (
                <Comment
                  comment={comment}
                  key={comment.id}
                  author={comment.user === user.id}
                />
              ))
            ) : (
              <ChatInputSkeleton />
            )}
            <div ref={bottomRef} className="h-px" />
            {isFetchingNextPage && <Spinner />}
          </div>
        }
        <div className="flex gap-x-4 px-6 py-4">
          <Input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isLoading}
          />
          <Button onClick={() => onClick()} disabled={isLoading}>
            <Send />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
