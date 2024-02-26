import isObject from '@/lib/isObject'
import { useEffect, MutableRefObject, Dispatch, SetStateAction } from 'react'

export const useFileUpdateEffect = (
  messagesToRenderFiles: MessagesToRender,
  newMessagesToRenderFiles: MessageData[],
  setRenderFiles: Dispatch<SetStateAction<(MessageData | null)[]>>,
  renderFilesStore: MutableRefObject<(MessageData | null)[]>
) => {
  useEffect(() => {
    if (Array.isArray(messagesToRenderFiles?.pages)) {
      const flattenedMessages = messagesToRenderFiles.pages
        .flatMap((page) => (Array.isArray(page) ? page : [page]))
        .filter((item) => item !== null)
      const toSet = [...newMessagesToRenderFiles, ...flattenedMessages]
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
          setRenderFiles(filteredToSetSorted)
          renderFilesStore.current = filteredToSetSorted
        }
      }
    }
  }, [messagesToRenderFiles, newMessagesToRenderFiles])
}
