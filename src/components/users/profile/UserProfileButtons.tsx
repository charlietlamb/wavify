import { Button } from '@/components/ui/button'
import { ActionTooltip } from '@/components/util/ActionTooltip'
import { MessageSquare, UserMinus, UserPlus } from 'lucide-react'
import { FaEllipsis } from 'react-icons/fa6'
import { useUserContext } from '../context/context'
import { useUser } from '@/state/user/useUser'
import { useRouter } from 'next/navigation'
import { handleFollowClick } from './functions/handleFollowClick'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'
import { toast } from 'sonner'

export default function UserProfileButtons() {
  const user = useUser()
  const supabase = createClientComponentClient()
  const { otherUser, followers, setFollowers, isFollowing, setIsFollowing } =
    useUserContext()
  const router = useRouter()

  return (
    <div className="flex gap-4">
      <ActionTooltip label={isFollowing ? 'Unfollow' : 'Follow'}>
        <Button
          variant="zinc_outline"
          onClick={() => {
            handleFollowClick(supabase, user, otherUser)
            if (isFollowing) {
              setFollowers(followers - 1)
              toast(`Unfollowed ${otherUser.username}`, {
                icon: <UserMinus />,
                description: 'You have unfollowed this user.',
              })
            } else {
              setFollowers(followers + 1)
              toast(`Followed ${otherUser.username}`, {
                icon: <UserPlus />,
                description: 'You have followed this user.',
              })
            }
            setIsFollowing(!isFollowing)
          }}
        >
          {isFollowing ? <UserMinus /> : <UserPlus />}
        </Button>
      </ActionTooltip>
      <ActionTooltip label="Send Message">
        <Button
          variant="zinc_outline"
          onClick={() => router.push(`/user/${otherUser.username}/chat`)}
        >
          <MessageSquare />
        </Button>
      </ActionTooltip>
      <ActionTooltip label="More Options">
        <Button variant="zinc_outline" onClick={() => supabase.auth.signOut()}>
          <FaEllipsis />
        </Button>
      </ActionTooltip>
    </div>
  )
}
