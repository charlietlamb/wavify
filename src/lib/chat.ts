import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

var conversation: Chat[] | Chat | null = null;

type ConversationProps =
  | { memberOneId: string; memberTwoId: string }
  | { collectiveId: string };

export const getOrCreateConversation = async (props: ConversationProps) => {
  const supabase = createServerComponentClient({ cookies });
  if ("collectiveId" in props) {
    const { collectiveId } = props;
    if (await findConversationCollective(collectiveId, supabase)) {
      return conversation;
    } else {
      await createNewConversationCollective(collectiveId, supabase);
      return conversation as Chat | null;
    }
  } else {
    const { memberOneId, memberTwoId } = props;
    if (await findConversation(memberOneId, memberTwoId, supabase)) {
      return conversation;
    } else {
      if (await findConversation(memberTwoId, memberOneId, supabase)) {
        return conversation;
      }
    }
    await createNewConversation(memberOneId, memberTwoId, supabase);
    return conversation as Chat | null;
  }
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

const findConversationCollective = async (
  collectiveId: string,
  supabase: SupabaseClient<any, "public", any>
) => {
  const { data } = await supabase
    .from("chats")
    .select()
    .filter("collective", "eq", collectiveId);
  conversation = data && data.length > 0 ? data[0] : null;
  return !!conversation;
};

const createNewConversationCollective = async (
  collectiveId: string,
  supabase: SupabaseClient<any, "public", any>
) => {
  const { data, error } = await supabase
    .from("chats")
    .insert({ collective: collectiveId, type: "collective" });
  if (data) {
    conversation = data;
  }
  return !!data;
};
