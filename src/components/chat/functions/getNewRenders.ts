import isObject from "@/lib/isObject";
import { isJson, isMessageAuthor } from "../utilityFunctions";

export async function getNewRenders(newArray: string[], supabase: Supabase) {
  const results = await Promise.all(
    newArray.map(async (message: Json) => {
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

      return isObject(response.data)
        ? {
            author:
              typeof response.data.author === "string"
                ? response.data.author
                : "",
            chat:
              typeof response.data.chat === "string" ? response.data.chat : "",
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
          }
        : [];
    })
  );

  return results as unknown as MessageAndAuthor[];
}
