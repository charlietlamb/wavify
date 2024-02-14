import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";
import { newMessageSent } from "../functions/newMessageSent";

export function useMessageSentEffect(
  chat: Chat,
  setNewMessagesToRender: (messages: MessageAndAuthor[]) => void,
  setNewMessagesToRenderFiles: (messages: MessageAndAuthor[]) => void,
  newMessagesToRender: MessageAndAuthor[],
  newMessagesToRenderFiles: MessageAndAuthor[],
  newMessagesToRenderStore: React.MutableRefObject<
    (MessageAndAuthor | null)[] | undefined
  >,
  newMessagesToRenderStoreFiles: React.MutableRefObject<
    (MessageAndAuthor | null)[] | undefined
  >
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
          table: "messages",
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any };
          if (
            newPayload &&
            typeof newPayload === "object" &&
            payload.eventType === "INSERT" &&
            newPayload.chat === chat.id
          ) {
            newMessageSent(
              newPayload,
              supabase,
              setNewMessagesToRender,
              setNewMessagesToRenderFiles,
              newMessagesToRender,
              newMessagesToRenderFiles,
              newMessagesToRenderStore,
              newMessagesToRenderStoreFiles
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