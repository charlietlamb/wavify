import { getOrCreateConversation } from "@/lib/chat";

export async function getChat(user: User, otherUser: User) {
  var conversation: Chat[] | Chat | null = await getOrCreateConversation({
    memberOneId: user.id,
    memberTwoId: otherUser.id,
  });
  if (Array.isArray(conversation)) {
    conversation = conversation[0];
  }

  const chat: Chat | null = conversation;
  return chat;
}
