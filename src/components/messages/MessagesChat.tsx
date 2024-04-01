import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMessagesContext } from './context/messagesContext'

export default function MessagesChat({ chat }: { chat: ChatAndUser }) {
  const { chat: currentChat } = useMessagesContext()
  const isCurrentChat = currentChat.id === chat.id
  const router = useRouter()
  return (
    <div className={cn('flex gap-2 p-2', isCurrentChat && 'bg-zinc-800')}>
      <div
        className="relative h-12 min-h-12 w-12 min-w-12"
        onClick={() => router.push(`/users/${chat.users.username}`)}
      >
        <Image
          alt={`${chat.users.username}'s chat image`}
          src={'https://github.com/shadcn.png'} //otherUser.imageUrl}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="rounded-sm "
        />
      </div>
      <div className="flex flex-grow flex-col">
        <div className="flex items-center justify-between">
          <h2 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-lg font-bold">
            {chat.users.username}
          </h2>
          <p className="text-sm text-zinc-500">{}</p>
        </div>
        <p className="text-sm text-zinc-500">
          {`${formatDistanceToNow(new Date(chat.lastSent))} ago`}
        </p>
      </div>
    </div>
  )
}
