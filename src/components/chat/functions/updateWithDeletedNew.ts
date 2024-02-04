export function updateWithDeletedNew(
  messages: (MessageAndAuthor | null)[],
  newMessage: MessageAndAuthor
) {
  return messages
    .map((message) => {
      if (message && message.id === newMessage.id) {
        return newMessage;
      }
      return message;
    })
    .filter(Boolean) as unknown as MessageAndAuthor[];
}
