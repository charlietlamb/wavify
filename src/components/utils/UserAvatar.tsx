import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ActionTooltip } from '../util/ActionTooltip'

interface UserAvatarProps {
  user: User
  className?: string
}
export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  const router = useRouter()
  return (
    <ActionTooltip label={user.username}>
      <Avatar
        className={cn('h-10 w-10 cursor-pointer', className)}
        onClick={(e) => {
          e.preventDefault()
          router.push(`/user/${user.username}`)
        }}
      >
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
    </ActionTooltip>
  )
}
