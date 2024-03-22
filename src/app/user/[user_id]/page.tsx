import getUser from '@/app/actions/getUser'
import User from '@/components/users/User'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getUserFromUsername } from '@/components/files/functions/getUserFromUsername'
import { getUserFollowersNumber } from '@/components/users/profile/functions/getUserFollowersNumber'
import { getUserFollowingNumber } from '@/components/users/profile/functions/getUserFollowingNumber'

export default async function page({
  params,
}: {
  params: { user_id: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const user = await getUser()
  if (!user) return redirect('/account')
  if (!user.setup_complete) return redirect('/setup')
  const otherUser = await getUserFromUsername(supabase, params.user_id)
  const initFollowers = await getUserFollowersNumber(supabase, otherUser.id)
  const initFollowing = await getUserFollowingNumber(supabase, otherUser.id)
  return (
    <User
      otherUser={otherUser}
      initFollowers={initFollowers}
      initFollowing={initFollowing}
    />
  )
}
