import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { newMessageSent } from "../functions/newMessageSent";

export function useMessageSentEffect(
  chat: Chat,
  messageIds: string[],
  setNewMessagesToRender: (messages: MessageAndAuthor[]) => void,
  setNewMessagesToRenderFiles: (messages: MessageAndAuthor[]) => void
) {
  const supabase = createClientComponentClient();
  useEffect(() => {
    const channel = supabase
      .channel("messages" + chat.id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "chats",
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (
            newPayload &&
            typeof newPayload === "object" &&
            newPayload.id === chat.id
          ) {
            newMessageSent(
              chat,
              supabase,
              messageIds,
              setNewMessagesToRender,
              setNewMessagesToRenderFiles
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, chat]);
}
