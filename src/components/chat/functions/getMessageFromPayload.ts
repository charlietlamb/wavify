import isObject from "@/lib/isObject";
import { isJson } from "../utilityFunctions";

export function getMessageFromPayload(
  newPayload: {
    [key: string]: any;
    id: string;
  },
  oldMessages: MessagesToRender | undefined,
  newMessages: (MessageAndAuthor | null)[] | undefined
) {
  let messageToDelete = newMessages
    ? newMessages.find(
        (message) => isObject(message) && message.id === newPayload.id
      )
    : undefined;
  if (messageToDelete === undefined && oldMessages) {
    if (oldMessages && oldMessages.pages) {
      for (let page of oldMessages.pages) {
        let message = page
          ? page.find((message) => message.id === newPayload.id)
          : undefined;
        if (message) {
          return message;
        }
      }
    }
  }
  return {
    author: typeof newPayload.author === "string" ? newPayload.author : "",
    chat: typeof newPayload.chat === "string" ? newPayload.chat : "",
    content: typeof newPayload.content === "string" ? newPayload.content : null,
    createdAt:
      typeof newPayload.createdAt === "string" ? newPayload.createdAt : null,
    deleted:
      typeof newPayload.deleted === "boolean" ? newPayload.deleted : null,
    edited: typeof newPayload.edited === "boolean" ? newPayload.edited : null,
    editedAt:
      typeof newPayload.editedAt === "string" ? newPayload.editedAt : null,
    files: isJson(newPayload.files) ? newPayload.files : null,
    id: typeof newPayload.id === "string" ? newPayload.id : "",
    users:
      messageToDelete && isObject(messageToDelete.users)
        ? {
            username: messageToDelete.users.username,
            profile_pic_url: messageToDelete.users.profile_pic_url,
          }
        : { username: "", profile_pic_url: "" },
  };
}
