'use client'

import { setSaved, setSpace } from '@/state/space/spaceSlice'
import { useCollective } from '@/state/collective/useCollective'
import { useAppSelector, useAppStore } from '@/state/hooks'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { ChatHeader } from '../chat/ChatHeader'
import isObject from '@/lib/isObject'
import { ChatMessages } from '../chat/ChatMessages'
import { ChatInput } from '../chat/ChatInput'
import { MediaRoom } from '../media/MediaRoom'
import Library from './library/Library'

interface SpaceProps {
  space: Space
  chat: Chat | null
  searchFilesData: (FileAndSender | null)[] | undefined
  saved: boolean
}

export default function Space({
  space,
  chat,
  searchFilesData,
  saved,
}: SpaceProps) {
  const { collective, colUser } = useCollective()
  const store = useAppStore()
  const initialized = useRef(false)
  if (!initialized.current) {
    store.dispatch(setSpace(space))
    store.dispatch(setSaved(saved))
    initialized.current = true
  }
  const router = useRouter()
  if (!space.open && !space.allowed.includes(colUser.roles?.id))
    router.push(`/collective/${collective.unique}`)
  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-background_content">
      <ChatHeader
        type="space"
        imageUrl={
          isObject(collective) && typeof collective.imageUrl === 'string'
            ? collective.imageUrl
            : ''
        }
        space={space}
      />
      {isObject(space) && space.type === 'text' && (
        <>
          <ChatMessages
            name={
              isObject(space) && typeof space.name === 'string'
                ? space.name
                : ''
            }
            chat={chat}
            type={'space'}
            fileTab={true}
            searchData={searchFilesData}
          />
          <ChatInput
            chat={chat}
            type="space"
            name={
              isObject(space) && typeof space.name === 'string'
                ? space.name
                : ''
            }
          />
        </>
      )}
      {isObject(space) &&
        (space.type === 'audio' || space.type === 'video') && (
          <MediaRoom
            chatId={typeof space.id === 'string' ? space.id : ''}
            video={space.type === 'video'}
            audio={true}
          />
        )}
    </div>
  )
}
