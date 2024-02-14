import { getMessageFromId } from "./getMessageFromId";

export async function newMessageSent(
  newMessage: { id: string; [key: string]: any },
  supabase: Supabase,
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
  const newMessageAndAuthor = await getMessageFromId(supabase, newMessage.id);
  const newRenders: MessageAndAuthor[] = newMessagesToRenderStore.current
    ? ([...newMessagesToRenderStore.current, newMessageAndAuthor].filter(
        Boolean
      ) as MessageAndAuthor[])
    : ([newMessageAndAuthor].filter(Boolean) as MessageAndAuthor[]);

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
