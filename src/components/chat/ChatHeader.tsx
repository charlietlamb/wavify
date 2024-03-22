'use client'

import { ChatVideoButton } from './ChatVideoButton'
import { UserAvatar } from '../utils/UserAvatar'
import { CollectiveToggle } from '../util/CollectiveToggle'
import isObject from '@/lib/isObject'
import { iconMap } from '../collective/space/data'
import { ChatState } from '@/state/chat/chatSlice'
import { RootState } from '@/state/store'
import { useSelector, useDispatch } from 'react-redux'
import { setToggle } from '@/state/chat/chatSlice'
import { Files, Mails } from 'lucide-react'
import { useUser } from '@/state/user/useUser'
import { useSpace } from '@/state/space/useSpace'
interface BaseChatHeaderProps {
  type: 'space' | 'conversation'
  imageUrl?: string
}

interface ChatHeaderPropsWithOtherUser extends BaseChatHeaderProps {
  otherUser: User
  space?: never // This ensures that 'space' cannot be provided when 'otherUser' is provided
}

interface ChatHeaderPropsWithSpace extends BaseChatHeaderProps {
  otherUser?: never // This ensures that 'otherUser' cannot be provided when 'space' is provided
  space: Space
}

type ChatHeaderProps = ChatHeaderPropsWithOtherUser | ChatHeaderPropsWithSpace

export const ChatHeader = ({
  otherUser,
  type,
  imageUrl,
  space,
}: ChatHeaderProps) => {
  const user = useUser()
  const chatState: ChatState = useSelector((state: RootState) => state.chat)
  const dispatch = useDispatch()
  return (
    <div className="text-md flex h-12 items-center border-b border-zinc-700 px-3 py-3 font-semibold">
      {type === 'space' ? <CollectiveToggle /> : null}
      {type === 'space' && iconMap[space?.type as keyof typeof iconMap]}
      {type === 'conversation' && otherUser && (
        <UserAvatar user={otherUser} className="mr-2 h-8 w-8 md:h-8 md:w-8" />
      )}
      <p className="text-md font-semibold text-black dark:text-white">
        {space && !Array.isArray(space) && typeof space === 'object' ? (
          <>{space.name}</>
        ) : isObject(otherUser) ? (
          otherUser.username
        ) : (
          'no name found'
        )}
      </p>
      <div className="ml-auto flex items-center">
        {(type === 'conversation' || space?.type === 'text') && (
          <button
            onClick={() => dispatch(setToggle(!chatState.toggle))}
            className="flex rounded-lg p-1 hover:rounded-md md:hidden"
          >
            {chatState.toggle ? <Mails /> : <Files />}
          </button>
        )}
        {type === 'conversation' && <ChatVideoButton />}
      </div>
    </div>
  )
}
