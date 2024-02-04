import { getOrCreateConversation } from "@/lib/chat";
import isObject from "@/lib/isObject";

export async function getChatSpace(collective: Collective, space: Json) {
  var conversation: Chat[] | Chat | null = await getOrCreateConversation({
    collectiveId: collective.id,
    space: isObject(space) && typeof space.slug === "string" ? space.slug : "",
  });
  if (Array.isArray(conversation)) {
    conversation = conversation[0];
  }

  const chat: Chat | null = conversation;
  return chat;
}
