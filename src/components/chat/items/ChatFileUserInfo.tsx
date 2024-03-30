import { ActionTooltip } from '@/components/util/ActionTooltip'
import isObject from '@/lib/isObject'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'
import { onMemberClick } from './functions/onMemberClick'
import { cn } from '@/lib/utils'
import { useChatItemContext } from './context/chatItemContext'

export default function ChatFileUserInfo() {
  const { message, user, role } = useChatItemContext()
  const router = useRouter()

  return (
    <div className={cn('flex items-center gap-x-2')}>
      <div className="flex items-center">
        <p
          onClick={() => onMemberClick(user, message, router)}
          className="cursor-pointer text-sm font-semibold text-white hover:underline"
        >
          {isObject(message.users) ? message.users.username : null}
        </p>
        {isObject(role) && (
          <ActionTooltip label={typeof role.name === 'string' ? role.name : ''}>
            {role.emoji}
          </ActionTooltip>
        )}
      </div>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">
        {typeof message.createdAt === 'string'
          ? formatDistanceToNow(new Date(message.createdAt)) + ' ago'
          : ''}
      </span>
    </div>
  )
}
