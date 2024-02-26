'use client'

import { useEffect, useState } from 'react'
import {
  AudioConference,
  LiveKitRoom,
  VideoConference,
} from '@livekit/components-react'
import '@livekit/components-styles'
import { useRouter } from 'next/navigation'
import MediaRoomSkeleton from './MediaRoomSkeleton'
import { useUser } from '@/state/user/useUser'
import { useCollective } from '@/state/collective/useCollective'
import { cn } from '@/lib/utils'

interface MediaRoomProps {
  chatId: string
  video: boolean
  audio: boolean
  otherUser?: User
}

export const MediaRoom = ({
  chatId,
  video,
  audio,
  otherUser,
}: MediaRoomProps) => {
  let collective: Collective | null = null
  if (!otherUser) {
    const collectiveState = useCollective()
    collective = collectiveState.collective
  }
  const user = useUser()
  const [token, setToken] = useState('')
  const [connected, setConnected] = useState(false)
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
    <div className="flex max-h-full flex-grow overflow-y-auto">
      <LiveKitRoom
        className={cn('w-full', !connected && 'w-0')}
        data-lk-theme="default"
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onConnected={() => {
          setConnected(true)
        }}
        onDisconnected={() => {
          setConnected(false)
          router.push(
            collective
              ? `/collective/${collective?.unique}`
              : `/user/${otherUser?.username}`
          )
        }}
      >
        {video ? (
          <VideoConference className=" lk-video-conference min-h-full bg-background_content" />
        ) : (
          <AudioConference className="lk-audio-conference min-h-full bg-background_content px-2" />
        )}
      </LiveKitRoom>
    </div>
  )
}
