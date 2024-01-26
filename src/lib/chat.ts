import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

var conversation: Chat[] | Chat | null = null;

export const getOrCreateConversation = async (
  memberOneId: string,
  memberTwoId: string
) => {
  const supabase = createServerComponentClient({ cookies });
  if (await findConversation(memberOneId, memberTwoId, supabase)) {
    return conversation;
  } else {
    if (await findConversation(memberTwoId, memberOneId, supabase)) {
      return conversation;
    }
  }
  await createNewConversation(memberOneId, memberTwoId, supabase);
  return conversation as Chat | null;
};

const findConversation = async (
  memberOneId: string,
  memberTwoId: string,
  supabase: SupabaseClient<any, "public", any>
) => {
  const { data } = await supabase
    .from("chats")
    .select()
    .filter("user1", "eq", memberOneId)
    .filter("user2", "eq", memberTwoId);
  conversation = data && data.length > 0 ? data[0] : null;
  return !!conversation;
};

const createNewConversation = async (
  memberOneId: string,
  memberTwoId: string,
  supabase: SupabaseClient<any, "public", any>
) => {
  const { data, error } = await supabase
    .from("chats")
    .insert({ user1: memberOneId, user2: memberTwoId, type: "user" });
  if (data) {
    conversation = data;
  }
  return !!data;
};
