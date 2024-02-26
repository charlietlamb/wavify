import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { newMessageSent } from '../functions/newMessageSent'
import { newFileSent } from '../functions/newFileSent'

export function useMessageSentEffect(
  chat: Chat,
  setNewMessagesToRender: (messages: MessageData[]) => void,
  setNewMessagesToRenderFiles: (messages: MessageData[]) => void,
  newMessagesToRender: MessageData[],
  newMessagesToRenderFiles: MessageData[],
  newMessagesToRenderStore: React.MutableRefObject<(MessageData | null)[]>,
  newMessagesToRenderStoreFiles: React.MutableRefObject<(MessageData | null)[]>,
  setRecentType: Dispatch<SetStateAction<'new' | 'old'>>,
  setRecentTypeFiles: Dispatch<SetStateAction<'new' | 'old'>>
) {
  const supabase = createClientComponentClient()
  useEffect(() => {
    const channel = supabase
      .channel('messages' + chat.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType === 'INSERT' &&
            newPayload.chat === chat.id
          ) {
            newMessageSent(
              newPayload,
              supabase,
              setNewMessagesToRender,
              setNewMessagesToRenderFiles,
              newMessagesToRender,
              newMessagesToRenderFiles,
              newMessagesToRenderStore,
              newMessagesToRenderStoreFiles,
              setRecentType,
              setRecentTypeFiles
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, chat])

  useEffect(() => {
    const channel = supabase
      .channel('files' + chat.id)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'files',
        },
        (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType === 'INSERT' &&
            newPayload.chat === chat.id
          ) {
            newFileSent(
              supabase,
              newPayload as unknown as FileData,
              setNewMessagesToRender,
              setNewMessagesToRenderFiles,
              newMessagesToRender,
              newMessagesToRenderFiles,
              newMessagesToRenderStore,
              newMessagesToRenderStoreFiles
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, chat])
}
