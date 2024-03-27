import { RefObject, useEffect, useState } from 'react'

type ResourceScrollProps = {
  resourceRef: React.RefObject<HTMLDivElement>
  bottomRef: React.RefObject<HTMLDivElement>
  shouldLoadMore: boolean
  loadMore: () => void
  scrollBottom?: boolean
}

export const useResourceScroll = ({
  resourceRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  scrollBottom = false,
}: ResourceScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    const topDiv = resourceRef?.current
    const handleScroll = () => {
      const scrollTop = topDiv?.scrollTop
      if (scrollTop === 0 && shouldLoadMore) {
        loadMore()
      }
    }

    topDiv?.addEventListener('scroll', handleScroll)

    return () => {
      topDiv?.removeEventListener('scroll', handleScroll)
    }
  }, [shouldLoadMore, loadMore, resourceRef])

  useEffect(() => {
    const bottomDiv = bottomRef
    const topDiv = resourceRef.current
    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true)
        return true
      }

      if (!topDiv) {
        return false
      }

      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight
      return distanceFromBottom <= 100
    }

    if (shouldAutoScroll() && scrollBottom) {
      bottomRef &&
        bottomRef?.current?.scrollIntoView({
          behavior: 'smooth',
        })
    }
  }, [bottomRef, resourceRef, hasInitialized])
}
