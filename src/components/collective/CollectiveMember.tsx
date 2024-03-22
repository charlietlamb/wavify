'use client'

import { useParams, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { UserAvatar } from '../utils/UserAvatar'
import isObject from '@/lib/isObject'
import { useUser } from '@/state/user/useUser'

interface CollectiveUserProps {
  colUserAndData: ColUserAndData
}

export const CollectiveMember = ({ colUserAndData }: CollectiveUserProps) => {
  const params = useParams()
  const router = useRouter()
  const user = useUser()
  if (!isObject(colUserAndData)) return null

  const onClick = () => {
    if (colUserAndData.users?.id === user.id) return
    router.push(`/user/${colUserAndData.users?.username}/chat/`)
  }
  return (
    <button
      onClick={onClick}
      className={cn(
        'group mb-1 flex w-full items-center justify-between rounded-md px-2  py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',

        params?.userId === colUserAndData.users?.id &&
          'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <div className=" flex w-full items-center gap-x-2  ">
        <UserAvatar
          user={colUserAndData.users}
          className="h-8 w-8 md:h-8 md:w-8"
        />
        <p
          className={cn(
            'text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
            params?.userId === colUserAndData.users?.id &&
              'text-primary dark:text-zinc-200 dark:group-hover:text-white'
          )}
          style={{ color: colUserAndData.roles?.color }}
        >
          {<>{colUserAndData.users?.username}</>}
        </p>
      </div>
      {colUserAndData.roles?.emoji}
    </button>
  )
}
