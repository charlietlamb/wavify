import isObject from '@/lib/isObject'

export function updateWithDeleted(
  messages: MessagesToRender,
  newMessage: MessageData
): MessagesToRender {
  return Array.isArray(messages.pages)
    ? ({
        pages: messages.pages.map(
          (page: MessageData[] | null) =>
            page?.map((item: MessageData) =>
              isObject(item) && item.id === newMessage.id
                ? { ...newMessage, deleted: true }
                : item
            ) as unknown as MessageData[]
        ),
      } as unknown as MessagesToRender)
    : messages
}
