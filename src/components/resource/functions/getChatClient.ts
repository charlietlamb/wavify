import {
  SupabaseClient,
  createClientComponentClient,
} from '@supabase/auth-helpers-nextjs'

var conversation: Chat[] | Chat | null = null

type ConversationProps =
  | { memberOneId: string; memberTwoId: string }
  | { collectiveId: string; space: string }

export default async function getOrCreateConversationClient(
  props: ConversationProps
) {
  const supabase = createClientComponentClient()
  if ('collectiveId' in props) {
    const { collectiveId, space } = props
    if (await findConversationCollective(collectiveId, space, supabase)) {
      return conversation
    } else {
      await createNewConversationCollective(collectiveId, space, supabase)
      return conversation as Chat | null
    }
  } else {
    const { memberOneId, memberTwoId } = props
    if (await findConversation(memberOneId, memberTwoId, supabase)) {
      return conversation
    } else {
      if (await findConversation(memberTwoId, memberOneId, supabase)) {
        return conversation
      }
    }
    await createNewConversation(memberOneId, memberTwoId, supabase)
    return conversation as Chat | null
  }
}

const findConversation = async (
  memberOneId: string,
  memberTwoId: string,
  supabase: SupabaseClient<any, 'public', any>
) => {
  const { data } = await supabase
    .from('chats')
    .select()
    .filter('user1', 'eq', memberOneId)
    .filter('user2', 'eq', memberTwoId)
  conversation = data && data.length > 0 ? data[0] : null
  return !!conversation
}

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
  supabase: SupabaseClient<any, 'public', any>
) => {
  const { data, error } = await supabase
    .from('chats')
    .insert({ user1: memberOneId, user2: memberTwoId, type: 'user' })
    .select()

  if (data) {
    conversation = data
  }
  return !!data
}

const findConversationCollective = async (
  collectiveId: string,
  space: string,
  supabase: SupabaseClient<any, 'public', any>
) => {
  const { data } = await supabase
    .from('chats')
    .select()
    .filter('collective', 'eq', collectiveId)
    .filter('space', 'eq', space)
  conversation = data && data.length > 0 ? data[0] : null
  return !!conversation
}

const createNewConversationCollective = async (
  collectiveId: string,
  space: string,
  supabase: SupabaseClient<any, 'public', any>
) => {
  const { data, error } = await supabase
    .from('chats')
    .insert({ collective: collectiveId, space: space, type: 'collective' })
    .select()
  if (data) {
    conversation = data
  }
  return !!data
}
