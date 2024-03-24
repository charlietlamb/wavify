import isObject from '@/lib/isObject'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react'
import { updateWithDeleted } from '../functions/updateWithDeleted'
import { updateWithDeletedNew } from '../functions/updateWithDeletedNew'
import { getMessageFromPayload } from '../functions/getMessageFromPayload'
export function useMessageDeletedEffect(
  chat: Chat,
  renderStore: MutableRefObject<(MessageData | null)[]>,
  setMessagesToRender: Dispatch<SetStateAction<MessagesToRender | undefined>>,
  setNewMessagesToRender: Dispatch<SetStateAction<MessageData[]>>,
  setMessagesToRenderFiles: Dispatch<
    SetStateAction<MessagesToRender | undefined>
  >,
  setNewMessagesToRenderFiles: Dispatch<SetStateAction<MessageData[]>>,
  messagesToRenderStore: MutableRefObject<MessagesToRender | undefined>,
  messagesToRenderFilesStore: MutableRefObject<MessagesToRender | undefined>,
  newMessagesToRenderStore: React.MutableRefObject<
    (MessageData | null)[] | undefined
  >,
  newMessagesToRenderStoreFiles: React.MutableRefObject<
    (MessageData | null)[] | undefined
  >
) {
  //TODO
  const supabase = createClientComponentClient()
  useEffect(() => {
    const channel = supabase
      .channel('message_deleted' + chat.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (renderStore.current) {
            const renderIds = renderStore.current.map((item) =>
              isObject(item) ? item.id : ''
            )
            if (
              newPayload &&
              typeof newPayload === 'object' &&
              renderIds.includes(newPayload.id)
            ) {
              const messageAndAuthorNew: MessageData = getMessageFromPayload(
                newPayload,
                messagesToRenderStore.current,
                newMessagesToRenderStore.current
              )
              const messageToDelete = await supabase
                .from('messages')
                .select(
                  `
                        *,
                        users(*)
                    `
                )
                .eq('id', isObject(newPayload) ? newPayload.id : '')
                .single()
              //need to change both so that code is maintainable and future changes to setRender are up to date

              const messagesToRenderPrev = updateWithDeleted(
                messagesToRenderStore.current
                  ? messagesToRenderStore.current
                  : { pages: [] },
                messageAndAuthorNew
              )
              setMessagesToRender((prev) => messagesToRenderPrev)
              messagesToRenderStore.current = messagesToRenderPrev
              const messagesToRenderNew = updateWithDeletedNew(
                newMessagesToRenderStore.current
                  ? newMessagesToRenderStore.current
                  : [],
                messageAndAuthorNew
              )
              setNewMessagesToRender(messagesToRenderNew)
              newMessagesToRenderStore.current = messagesToRenderNew

              if (messageToDelete.data.files !== null) {
                const messagesToRenderFilesPrev = updateWithDeleted(
                  messagesToRenderFilesStore.current
                    ? messagesToRenderFilesStore.current
                    : { pages: [] },
                  messageAndAuthorNew
                )
                setMessagesToRenderFiles((prev) => messagesToRenderFilesPrev)
                messagesToRenderFilesStore.current = messagesToRenderFilesPrev
                const messagesToRenderFilesNew = updateWithDeletedNew(
                  newMessagesToRenderStoreFiles.current
                    ? newMessagesToRenderStoreFiles.current
                    : [],
                  messageAndAuthorNew
                )
                setNewMessagesToRenderFiles(messagesToRenderFilesNew)
                newMessagesToRenderStoreFiles.current = messagesToRenderFilesNew
              }
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])
}
