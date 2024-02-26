import isObject from '@/lib/isObject'
import { useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react'

type MessagesToRender = {
  pages: (MessageData[] | null)[]
}

export const useMessageUpdateEffect = (
  messagesToRender: MessagesToRender,
  newMessagesToRender: MessageData[],
  setRender: Dispatch<SetStateAction<(MessageData | null)[]>>,
  renderStore: MutableRefObject<(MessageData | null)[]>
) => {
  useEffect(() => {
    if (Array.isArray(messagesToRender?.pages)) {
      const flattenedMessages = messagesToRender.pages
        .flatMap((page) => (Array.isArray(page) ? page : [page]))
        .filter((item) => item !== null)
      const toSet = [...newMessagesToRender, ...flattenedMessages]
      if (toSet.includes(null) || typeof toSet === 'undefined') {
        throw new Error('Null in messages')
      } else {
        const toSetSorted = toSet
          .filter((item) => item !== null)
          .sort(
            (a, b) =>
              new Date(
                isObject(b) && typeof b.createdAt === 'string'
                  ? b?.createdAt
                  : ''
              ).getTime() -
              new Date(
                isObject(a) && typeof a.createdAt === 'string'
                  ? a?.createdAt
                  : ''
              ).getTime()
          )
        if (
          toSetSorted !== null &&
          toSetSorted !== undefined &&
          Array.isArray(toSetSorted) &&
          toSetSorted.length > 0
        ) {
          const filteredToSetSorted = toSetSorted.filter(
            (item): item is MessageData => item !== null
          )
          //error here
          setRender(filteredToSetSorted)
          renderStore.current = toSetSorted
        }
      }
    }
  }, [messagesToRender, newMessagesToRender])
}
