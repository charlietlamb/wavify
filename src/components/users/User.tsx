'use client'

import UserProfile from './profile/UserProfile'
import { UserContext } from './context/context'
import UserContent from './content/UserContent'
import { useState } from 'react'
import { UserMode } from './data/data'
import { useUser } from '@/state/user/useUser'

export default function User({
  otherUser,
  initFollowers,
  initFollowing,
}: {
  otherUser: User
  initFollowers: number
  initFollowing: number
}) {
  const user = useUser()
  const [mode, setMode] = useState<UserMode>('content')
  const [followers, setFollowers] = useState(initFollowers)
  const [following, setFollowing] = useState(initFollowing)
  const [isFollowing, setIsFollowing] = useState(
    user.following.includes(otherUser.id)
  )
  return (
    <UserContext.Provider
      value={{
        otherUser,
        mode,
        setMode,
        followers,
        setFollowers,
        following,
        setFollowing,
        isFollowing,
        setIsFollowing,
      }}
    >
      <div className="flex w-full divide-x divide-zinc-700">
        <UserProfile />
        <UserContent />
      </div>
    </UserContext.Provider>
  )
}
