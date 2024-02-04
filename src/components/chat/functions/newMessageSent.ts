import { SupabaseClient } from "@supabase/supabase-js";
import { isJson, isMessageAuthor } from "../utilityFunctions";
import isObject from "@/lib/isObject";
import { getNewRenders } from "./getNewRenders";

export async function newMessageSent(
  chat: Chat,
  supabase: SupabaseClient<any, "public", any>,
  messageIds: string[],
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
  const newRenders: MessageAndAuthor[] = await getNewRenders(
    newArray,
    supabase
  );

  const uniqueNewRenders: MessageAndAuthor[] = newRenders.filter(
    (item: MessageAndAuthor, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
  );

  const toSetNewMessagesToRender = newMessagesToRenderStore.current
    ? ([...newMessagesToRenderStore.current, ...uniqueNewRenders].filter(
        Boolean
      ) as MessageAndAuthor[])
    : ([...newMessagesToRender, ...uniqueNewRenders].filter(
        Boolean
      ) as MessageAndAuthor[]);
  const toSet = toSetNewMessagesToRender.filter(
    (item: MessageAndAuthor, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
  );
  setNewMessagesToRender(toSet);

  if (newMessagesToRenderStore) newMessagesToRenderStore.current = toSet;
  //if this fixes any issues then could be issues with setting files
  uniqueNewRenders.forEach((item) => {
    if (item.files) {
      const toSetFiles = [...newMessagesToRenderFiles, ...uniqueNewRenders];
      const toSet = toSetFiles.filter(
        (item: MessageAndAuthor, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
      );
      setNewMessagesToRenderFiles(toSet);
      if (newMessagesToRenderStoreFiles)
        newMessagesToRenderStoreFiles.current = toSet;
    }
  });
}
