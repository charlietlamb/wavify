import { UserAvatar } from '@/components/me/UserAvatar'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'

export default function Comment({
  comment,
  author,
}: {
  comment: CommentAndUser
  author: boolean
}) {
  return (
    <div
      key={comment.id}
      className={cn(
        'flex flex-col gap-y-2 rounded-md bg-zinc-950 px-4 py-2',
        author && 'bg-zinc-900'
      )}
    >
      <div className="flex items-center">
        <UserAvatar
          src={comment.users?.profile_pic_url}
          className="h-8 w-8 rounded-full"
        />
        <div className="ml-2">
          <p
            className={cn(
              'text-sm font-bold text-zinc-400',
              author && 'text-zinc-200'
            )}
          >
            {comment.users?.username}
          </p>
          <p className={cn('text-xs text-zinc-400', author && 'text-zinc-200')}>
            {formatDistanceToNow(new Date(comment.createdAt)) + ' ago'}
          </p>
        </div>
      </div>
      <p className={cn('text-sm text-zinc-400', author && 'text-zinc-200')}>
        {comment.message}
      </p>
    </div>
  )
}
