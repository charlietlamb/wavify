import { Dispatch, SetStateAction, useEffect } from 'react'
import { getChatFiles } from '../functions/getChatFiles'

export function useFileDataUpdateEffect(
  supabase: Supabase,
  chat: Chat,
  setFileData: Dispatch<SetStateAction<FileAndSender[]>>
) {
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
        async (payload) => {
          const newPayload = payload.new as { id: string; [key: string]: any }
          if (
            newPayload &&
            typeof newPayload === 'object' &&
            payload.eventType === 'INSERT' &&
            newPayload.chat === chat.id
          ) {
            setFileData(await getChatFiles(supabase, chat))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, chat])
}
