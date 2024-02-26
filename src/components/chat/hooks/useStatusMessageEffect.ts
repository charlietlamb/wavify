import { Dispatch, SetStateAction, useEffect } from 'react'

export default function useStatusMessageEffect(
  status: 'success' | 'pending' | 'error',
  messages: MessagesToRender,
  setMessagesToRender: Dispatch<SetStateAction<MessagesToRender | undefined>>,
  lastFetched: string,
  messageToRenderStore: React.MutableRefObject<MessagesToRender | undefined>
) {
  useEffect(() => {
    if (status === 'success') {
      messageToRenderStore.current = messages
      setMessagesToRender(messages)
    }
  }, [lastFetched, status])
}
