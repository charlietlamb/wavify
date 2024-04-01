import { useEffect, useState } from 'react'
import { ChatHeader } from '../chat/ChatHeader'
import { MediaRoom } from '../media/MediaRoom'
import { useMessagesContext } from './context/messagesContext'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getSearchFilesData } from '@/app/user/[user_id]/chat/(functions)/getSearchFilesData'
import { ChatMessages } from '../chat/ChatMessages'
import { ChatInput } from '../chat/ChatInput'
import { useSearchParams } from 'next/navigation'

export default function MessagesContent() {
  const supabase = createClientComponentClient()
  const { chat } = useMessagesContext()
  const [searchFilesData, setSearchFilesData] = useState<FileAndSender[]>([])
  const searchParams = useSearchParams()
  const video = searchParams.get('video')

  useEffect(() => {
    async function getData() {
      setSearchFilesData(await getSearchFilesData(supabase, chat))
    }
    getData()
  })
  return (
    <div className="flex w-full flex-grow flex-col">
      <ChatHeader
        imageUrl="https://github.com/shadcn.png"
        otherUser={chat.users}
        type="conversation"
      />
      {video && (
        <MediaRoom
          chatId={chat.id}
          video={true}
          audio={true}
          otherUser={chat.users}
        />
      )}
      {!video && (
        <div className="flex-grow overflow-hidden">
          <ChatMessages
            chat={chat}
            type="chat"
            name={chat.users.username}
            fileTab={true}
            searchData={searchFilesData}
          />
        </div>
      )}
      {chat && (
        <ChatInput
          chat={chat}
          type="conversation"
          name={chat.users.username ? chat.users.username : ''}
        />
      )}
    </div>
  )
}
