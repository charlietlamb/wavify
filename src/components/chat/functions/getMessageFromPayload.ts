import isObject from '@/lib/isObject'

export function getMessageFromPayload(
  newPayload: {
    [key: string]: any
    id: string
  },
  oldMessages: MessagesToRender | undefined,
  newMessages: (MessageData | null)[] | undefined
) {
  let messageToDelete = newMessages
    ? newMessages.find(
        (message) => isObject(message) && message.id === newPayload.id
      )
    : undefined
  if (messageToDelete === undefined && oldMessages) {
    if (oldMessages && oldMessages.pages) {
      for (let page of oldMessages.pages) {
        let message = page
          ? page.find((message) => message.id === newPayload.id)
          : undefined
        if (message) {
          return { ...message, fileData: null } as MessageData
        }
      }
    }
  }
  const messageAndAuthorNew = newPayload as MessageAndAuthor
  return {
    ...messageAndAuthorNew,
    fileData: null,
  } as MessageData
}
