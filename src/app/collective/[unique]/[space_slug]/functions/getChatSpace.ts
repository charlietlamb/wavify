import { getOrCreateConversation } from "@/lib/chat";

export async function getChatSpace(collective: Collective, space: Space) {
  var conversation: Chat[] | Chat | null = await getOrCreateConversation({
    collectiveId: collective.id,
    space: space.id,
  });
  if (Array.isArray(conversation)) {
    conversation = conversation[0];
  }

  const chat: Chat | null = conversation;
  return chat;
}
