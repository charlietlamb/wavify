import { getMessageFiles } from './getMessageFiles'
import { getMessageFromFile } from './getMessageFromFile'

export async function newFileSent(
  supabase: Supabase,
  newFile: FileData,
  setNewMessagesToRender: (messages: MessageData[]) => void,
  setNewMessagesToRenderFiles: (messages: MessageData[]) => void,
  newMessagesToRender: MessageData[],
  newMessagesToRenderFiles: MessageData[],
  newMessagesToRenderStore: React.MutableRefObject<(MessageData | null)[]>,
  newMessagesToRenderStoreFiles: React.MutableRefObject<(MessageData | null)[]>
) {
  const newMessage: MessageAndAuthor = await getMessageFromFile(
    supabase,
    newFile
  )
  const fileData = await getMessageFiles(supabase, newMessage)

  const updatedMessage = {
    ...newMessage,
    fileData,
  }
  const newRenders: (MessageData | null)[] =
    newMessagesToRenderStore.current.map((message: MessageData | null) => {
      if (!message) return null
      if (message.id === updatedMessage.id) {
        return updatedMessage
      } else {
        return message
      }
    })
  const nonNullData: MessageData[] = newRenders.filter(
    (item): item is MessageData => item !== null
  )

  setNewMessagesToRender(nonNullData)
  const newRendersFiles: (MessageData | null)[] =
    newMessagesToRenderStoreFiles.current.map((message: MessageData | null) => {
      if (!message) return null
      if (message.id === updatedMessage.id) {
        return updatedMessage
      } else {
        return message
      }
    })
  const nonNullDataFiles: MessageData[] = newRendersFiles.filter(
    (item): item is MessageData => item !== null
  )

  setNewMessagesToRenderFiles(nonNullDataFiles)
}
