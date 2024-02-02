import isObject from "@/lib/isObject";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { MutableRefObject, useEffect } from "react";
import { isJson, isMessageAuthor } from "../utilityFunctions";

export function useMessageDeletedEffect(
  chat: Chat,
  renderStore: MutableRefObject<(MessageAndAuthor | null)[]>,
  setRender: (messages: MessageAndAuthor[]) => void,
  renderFilesStore: MutableRefObject<(MessageAndAuthor | null)[]>,
  setRenderFiles: (messages: MessageAndAuthor[]) => void
) {
  const supabase = createClientComponentClient();
  useEffect(() => {
    const channel = supabase
      .channel("message_deleted" + chat.id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (renderStore.current) {
            const renderIds = renderStore.current.map((item) =>
              isObject(item) ? item.id : ""
            );
            if (
              newPayload &&
              typeof newPayload === "object" &&
              renderIds.includes(newPayload.id)
            ) {
              const messageAndAuthorNew: MessageAndAuthor = {
                author:
                  typeof newPayload.author === "string"
                    ? newPayload.author
                    : "",
                chat:
                  typeof newPayload.chat === "string" ? newPayload.chat : "",
                content:
                  typeof newPayload.content === "string"
                    ? newPayload.content
                    : null,
                createdAt:
                  typeof newPayload.createdAt === "string"
                    ? newPayload.createdAt
                    : null,
                deleted:
                  typeof newPayload.deleted === "boolean"
                    ? newPayload.deleted
                    : null,
                edited:
                  typeof newPayload.edited === "boolean"
                    ? newPayload.edited
                    : null,
                editedAt:
                  typeof newPayload.editedAt === "string"
                    ? newPayload.editedAt
                    : null,
                files: isJson(newPayload.files) ? newPayload.files : null,
                id: typeof newPayload.id === "string" ? newPayload.id : "",
                users: isMessageAuthor(newPayload.users)
                  ? {
                      username: newPayload.users.users.username,
                      profile_pic_url: newPayload.users.users.profile_pic_url,
                    }
                  : isMessageAuthor(newPayload)
                  ? {
                      username: newPayload.users.username,
                      profile_pic_url: newPayload.users.profile_pic_url,
                    }
                  : { username: "", profile_pic_url: "" },
              };
              const messageToDelete = await supabase
                .from("messages")
                .select(
                  `
                        *,
                        users ( username, profile_pic_url)
                    `
                )
                .eq("id", isObject(newPayload) ? newPayload.id : "")
                .single();
              const newMessages = [
                ...(renderStore.current.filter(
                  (message) =>
                    isObject(message) && message.id !== messageToDelete.data.id
                ) ?? []),
                messageToDelete.data,
              ].sort(
                (a, b) =>
                  new Date(
                    isObject(b) && typeof b.createdAt === "string"
                      ? b?.createdAt
                      : ""
                  ).getTime() -
                  new Date(
                    isObject(a) && typeof a.createdAt === "string"
                      ? a?.createdAt
                      : ""
                  ).getTime()
              );
              setRender(newMessages);

              if (messageToDelete.data.files !== null) {
                const newFiles = [
                  ...(renderFilesStore.current.filter(
                    (message) =>
                      isObject(message) &&
                      message.id !== messageToDelete.data.id
                  ) ?? []),
                  messageToDelete.data,
                ].sort(
                  (a, b) =>
                    new Date(
                      isObject(b) && typeof b.createdAt === "string"
                        ? b?.createdAt
                        : ""
                    ).getTime() -
                    new Date(
                      isObject(a) && typeof a.createdAt === "string"
                        ? a?.createdAt
                        : ""
                    ).getTime()
                );
                setRenderFiles(newFiles);
              }
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);
}
