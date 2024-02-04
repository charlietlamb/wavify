import isObject from "@/lib/isObject";

export function updateWithDeleted(
  messages: MessagesToRender,
  newMessage: MessageAndAuthor
): MessagesToRender {
  return Array.isArray(messages.pages)
    ? ({
        pages: messages.pages.map(
          (page: MessageAndAuthor[] | null) =>
            page?.map((item: MessageAndAuthor) =>
              isObject(item) && item.id === newMessage.id
                ? { ...newMessage, deleted: true }
                : item
            ) as unknown as MessageAndAuthor[]
        ),
      } as unknown as MessagesToRender)
    : messages;
}
