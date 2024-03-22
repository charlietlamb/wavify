import { redirect } from 'next/navigation'
import { ChatHeader } from '@/components/chat/ChatHeader'
import getUser from '@/app/actions/getUser'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatMessages } from '@/components/chat/ChatMessages'
import isObject from '@/lib/isObject'
import { getSearchFilesData } from './(functions)/getSearchFilesData'
import { getChat } from './(functions)/getChat'
import { getOtherUser } from './(functions)/getOtherUser'
import { MediaRoom } from '@/components/media/MediaRoom'

interface MemberIdPageProps {
  params: {
    user_id: string
  }
  searchParams: {
    video?: boolean
  }
}

const ChatPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const user = await getUser()
  const supabase = createServerComponentClient({ cookies })
  if (!user) redirect('/account')
  const otherUser = await getOtherUser(supabase, params.user_id)
  if (!otherUser) return redirect(`/`)
  const chat = await getChat(user, otherUser)
  if (!chat) return redirect(`/`)
  const searchFilesData = await getSearchFilesData(supabase, chat)

  return (
    <div className="flex w-full flex-grow flex-col bg-background">
      <ChatHeader
        imageUrl="https://github.com/shadcn.png"
        otherUser={otherUser}
        type="conversation"
      />
      {searchParams.video && (
        <MediaRoom
          chatId={chat.id}
          video={true}
          audio={true}
          otherUser={otherUser}
        />
      )}
      {!searchParams.video && (
        <div className="flex-grow overflow-hidden">
          <ChatMessages
            chat={chat ? chat : null}
            type="chat"
            name={
              isObject(otherUser) && otherUser.username
                ? otherUser.username
                : 'undefined'
            }
            fileTab={true}
            searchData={searchFilesData ? searchFilesData : []}
          />
        </div>
      )}
      {chat && (
        <ChatInput
          chat={chat}
          type="conversation"
          name={otherUser.username ? otherUser.username : ''}
        />
      )}
    </div>
  )
}

export default ChatPage
