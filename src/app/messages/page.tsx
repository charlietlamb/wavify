import { redirect } from 'next/navigation'
import getUser from '../actions/getUser'
import Messages from '@/components/messages/Messages'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { getMostRecentChatAndOtherUser } from '@/components/messages/functions/getMostRecentChatAndOtherUser'

export default async function page() {
  const user = await getUser()
  const supabase = createServerComponentClient({ cookies })
  if (!user) return redirect('/account')
  if (!user.setup_complete) return redirect('/setup')
  const chat = await getMostRecentChatAndOtherUser(supabase, user)
  return <Messages chat={chat} />
}
