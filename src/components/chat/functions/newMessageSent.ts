import { Dispatch, SetStateAction } from 'react'
import { getMessageFromId } from './getMessageFromId'

export async function newMessageSent(
  newMessage: { id: string; [key: string]: any },
  supabase: Supabase,
  setNewMessagesToRender: (messages: MessageData[]) => void,
  setNewMessagesToRenderFiles: (messages: MessageData[]) => void,
  newMessagesToRender: MessageData[],
  newMessagesToRenderFiles: MessageData[],
  newMessagesToRenderStore: React.MutableRefObject<(MessageData | null)[]>,
  newMessagesToRenderStoreFiles: React.MutableRefObject<(MessageData | null)[]>,
  setRecentType: Dispatch<SetStateAction<'new' | 'old'>>,
  setRecentTypeFiles: Dispatch<SetStateAction<'new' | 'old'>>
) {
  setRecentType('new')
  const newMessageData: MessageData = await getMessageFromId(
    supabase,
    newMessage.id
  )
  const newRenders: MessageData[] = newMessagesToRenderStore.current
    ? ([...newMessagesToRenderStore.current, newMessageData].filter(
        Boolean
      ) as MessageData[])
    : ([newMessageData].filter(Boolean) as MessageData[])

  const uniqueNewRenders: MessageData[] = newRenders.filter(
    (item: MessageData, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
  )

  const toSetNewMessagesToRender = newMessagesToRenderStore.current
    ? ([...newMessagesToRenderStore.current, ...uniqueNewRenders].filter(
        Boolean
      ) as MessageData[])
    : ([...newMessagesToRender, ...uniqueNewRenders].filter(
        Boolean
      ) as MessageData[])
  const toSet = toSetNewMessagesToRender.filter(
    (item: MessageData, index, self) =>
      index === self.findIndex((t) => t.id === item.id)
  )
  setNewMessagesToRender(toSet)

  if (newMessagesToRenderStore) newMessagesToRenderStore.current = toSet
  //if this fixes any issues then could be issues with setting files
  uniqueNewRenders.forEach((item) => {
    if (item.files) {
      setRecentTypeFiles('new')
      const toSetFiles = [...newMessagesToRenderFiles, ...uniqueNewRenders]
      const toSet = toSetFiles.filter(
        (item: MessageData, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
      )
      setNewMessagesToRenderFiles(toSet)
      if (newMessagesToRenderStoreFiles)
        newMessagesToRenderStoreFiles.current = toSet
    }
  })
}
