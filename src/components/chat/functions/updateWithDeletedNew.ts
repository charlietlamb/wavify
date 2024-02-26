export function updateWithDeletedNew(
  messages: (MessageData | null)[],
  newMessage: MessageData
) {
  return messages
    .map((message) => {
      if (message && message.id === newMessage.id) {
        return newMessage
      }
      return message
    })
    .filter(Boolean) as unknown as MessageData[]
}
