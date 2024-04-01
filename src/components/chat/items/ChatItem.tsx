'use client'

import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { UserAvatar } from '../../utils/UserAvatar'
import isObject from '@/lib/isObject'
import ResizableDiv from '../../utils/ResizableDiv'
import { useUser } from '@/state/user/useUser'
import { useItemContext } from './context'
import { useCollective } from '@/state/collective/useCollective'
import ChatItemFile from './ChatItemFile'
import ChatFileContent from './ChatFileContent'
import { onMemberClick } from './functions/onMemberClick'
import ChatFileUserInfo from './ChatFileUserInfo'
import ChatItemMessage from './ChatItemMessage'
import { ChatItemContext } from './context/chatItemContext'
interface ChatItemProps {
  message: MessageData | null
}

export function ChatItem({ message }: ChatItemProps) {
  const user = useUser()
  const { type } = useItemContext()
  let collectiveState = null
  if (type === 'space') {
    collectiveState = useCollective()
  }
  const collective = collectiveState ? collectiveState.collective : null
  const colUser = collectiveState ? collectiveState.colUser : null
  if (!message) return null
  const otherUser = message.users
  const files = message.fileData
  const router = useRouter()

  var canDeleteAny = false
  const role = colUser ? colUser.roles : null
  if (collective && isObject(role) && role.canMessages) {
    canDeleteAny = true
  }
  const isSender = user.id === message.author
  if (!collective && isSender) {
    canDeleteAny = true
  }
  const external = !!(
    message.resource ||
    message.product ||
    message.collective ||
    message.collection ||
    message.member
  )
  return (
    <ChatItemContext.Provider
      value={{
        user,
        message,
        role,
        isSender,
        canDeleteAny,
        files,
        external,
      }}
    >
      <ResizableDiv
        className={cn(
          'group relative flex cursor-auto items-center rounded-lg border border-zinc-900 bg-transparent p-4 transition hover:border-zinc-800',
          isSender && 'ml-auto border-zinc-700 hover:border-zinc-600'
        )}
      >
        <div className={cn('group flex w-full items-start gap-x-2')}>
          <div
            onClick={() => onMemberClick(user, message, router)}
            className="cursor-pointer transition hover:drop-shadow-md"
          >
            <UserAvatar user={otherUser} noTooltip />
          </div>
          <div className="flex w-full flex-col">
            <ChatFileUserInfo />
            <ChatItemMessage />
          </div>
        </div>
      </ResizableDiv>
    </ChatItemContext.Provider>
  )
}
