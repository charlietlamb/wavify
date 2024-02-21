import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import getUser from '@/app/actions/getUser'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { ChatInput } from '@/components/chat/ChatInput'
import isObject from '@/lib/isObject'
import { getSearchFilesData } from '@/app/user/[user_id]/chat/(functions)/getSearchFilesData'
import { getSpace } from './(functions)/getSpace'
import { getChatSpace } from './(functions)/getChatSpace'
import { getCollective } from './(functions)/getCollective'
import { getColUserDataFromUserAndCol } from '@/components/collective/(sidebar)/(functions)/getColUserDataFromUserAndCol'
import { MediaRoom } from '@/components/media/MediaRoom'
import { MediaContext } from './(hooks)/useMediaContext'
import { SpaceProvider } from '@/components/providers/SpaceProvider'
import Space from '@/components/collective/Space'

interface spacePageParams {
  unique: string
  space_slug: string
}

interface spacePageProps {
  params: spacePageParams
}

export default async function page({ params }: spacePageProps) {
  const supabase = createServerComponentClient({ cookies })
  const user = await getUser()
  if (!user) redirect('/account')
  const collective = await getCollective(supabase, params.unique)
  if (!collective) redirect(`/`)
  const space = await getSpace(collective, params.space_slug, supabase)
  if (!space || Array.isArray(space)) redirect(`/collective/${params.unique}`)
  let chat: Chat | null = null
  let searchFilesData
  if (space.type === 'text') {
    chat = await getChatSpace(collective, space)
    if (!chat) return redirect(`/`)
    searchFilesData = await getSearchFilesData(supabase, chat)
  }

  return <Space space={space} chat={chat} searchFilesData={searchFilesData} />
}
