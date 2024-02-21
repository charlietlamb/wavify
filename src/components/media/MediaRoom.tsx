'use client'

import { useEffect, useState } from 'react'
import { LiveKitRoom, VideoConference } from '@livekit/components-react'
import '@livekit/components-styles'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import MediaRoomSkeleton from './MediaRoomSkeleton'
import { useUser } from '@/state/user/useUser'

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
  collective?: Collective
  otherUser?: User
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  collective,
  otherUser,
}: MediaRoomProps) => {
  const user = useUser()
  const [token, setToken] = useState('')
  const router = useRouter()
  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${user.username}`
        )
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        throw e
      }
    })()
  }, [user?.username, chatId])

  return token === '' ? (
    <MediaRoomSkeleton />
  ) : (
    <div className="flex max-h-full overflow-y-auto">
      <LiveKitRoom
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={() => {
          router.push(
            collective
              ? `/collective/${collective?.unique}`
              : `/user/${otherUser?.username}`
          )
        }}
      >
        <VideoConference className=" lk-video-conference min-h-full bg-background_content" />
      </LiveKitRoom>
    </div>
  )
}
