import isObject from "@/lib/isObject";

export async function getMessageIds(chat: Chat) {
  const messagesInOrder = Array.isArray(chat.messages)
    ? chat?.messages?.sort((a, b) =>
        isObject(a) &&
        isObject(b) &&
        typeof a.createdAt === "string" &&
        typeof b.createdAt === "string"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : 0
      )
    : [];
  const messageIds: string[] = Array.isArray(messagesInOrder)
    ? messagesInOrder.map((message: Json) =>
        isObject(message) && typeof message.id === "string" ? message.id : ""
      )
    : [];
  return messageIds;
}
