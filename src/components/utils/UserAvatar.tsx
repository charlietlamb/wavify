import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface UserAvatarProps {
  user: User
  className?: string
}
export const UserAvatar = ({ user, className }: UserAvatarProps) => {
  const router = useRouter()
  return (
    <Avatar
      className={cn('h-10 w-10', className)}
      onClick={() => router.push(`/user/${user.username}`)}
    >
      <AvatarImage src="https://github.com/shadcn.png" />
    </Avatar>
  )
}
