import { SupabaseClient } from "@supabase/supabase-js";
import { isJson, isMessageAuthor } from "../utilityFunctions";
import isObject from "@/lib/isObject";

export async function newMessageSent(
  chat: Chat,
  supabase: SupabaseClient<any, "public", any>,
  messageIds: string[],
  setNewMessagesToRender: (messages: MessageAndAuthor[]) => void,
  setNewMessagesToRenderFiles: (messages: MessageAndAuthor[]) => void
) {
  const { data: newMessageIdArray } = await supabase
    .from("chats")
    .select("messages")
    .eq("id", chat ? chat.id : "")
    .single();
  if (!Array.isArray(newMessageIdArray?.messages)) return;
  const newArray: string[] = newMessageIdArray?.messages.filter(
    (item: Json) =>
      isObject(item) &&
      typeof item.id === "string" &&
      !messageIds.includes(item.id)
  );
  var newRenders: MessageAndAuthor[] = [];
  await newArray.forEach(async (message: Json) => {
    const response = await supabase
      .from("messages")
      .select(
        `
            *,
            users ( username, profile_pic_url)
        `
      )
      .eq("id", isObject(message) ? message.id : "")
      .single();
    if (response.error) {
      throw new Error(response.error.message);
    }
    if (isObject(response.data)) {
      const messageAndAuthorNew: MessageAndAuthor = {
        author:
          typeof response.data.author === "string" ? response.data.author : "",
        chat: typeof response.data.chat === "string" ? response.data.chat : "",
        content:
          typeof response.data.content === "string"
            ? response.data.content
            : null,
        createdAt:
          typeof response.data.createdAt === "string"
            ? response.data.createdAt
            : null,
        deleted:
          typeof response.data.deleted === "boolean"
            ? response.data.deleted
            : null,
        edited:
          typeof response.data.edited === "boolean"
            ? response.data.edited
            : null,
        editedAt:
          typeof response.data.editedAt === "string"
            ? response.data.editedAt
            : null,
        files: isJson(response.data.files) ? response.data.files : null,
        id: typeof response.data.id === "string" ? response.data.id : "",
        users: isMessageAuthor(response.data.users)
          ? {
              username: response.data.users.users.username,
              profile_pic_url: response.data.users.users.profile_pic_url,
            }
          : isMessageAuthor(response.data)
          ? {
              username: response.data.users.username,
              profile_pic_url: response.data.users.profile_pic_url,
            }
          : { username: "", profile_pic_url: "" },
      };
      newRenders = [...newRenders, messageAndAuthorNew];
      setNewMessagesToRender(newRenders);
      if (messageAndAuthorNew.files !== null) {
        setNewMessagesToRenderFiles(newRenders);
      }
    }
  });
}
