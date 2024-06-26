import { useEffect } from 'react'
import { ChatWelcome } from '../ChatWelcome'
import ChatItemLoader from './ChatItemLoader'
import ChatItemMap from './ChatItemMap'
import { useItemContext } from './context'

export default function ChatItemContainer() {
  const context = useItemContext()
  const { bottomRef, render, hasNextPage, setBottomRefState } = context

  useEffect(() => {
    setBottomRefState(bottomRef.current)
  }, [bottomRef])

  return (
    <div className="flex w-full flex-col-reverse gap-y-1">
      <div ref={bottomRef} className="h-[1px]"></div>
      <ChatItemMap />
      {hasNextPage && <ChatItemLoader />}
      {!hasNextPage && <ChatWelcome />}
      {!hasNextPage && <div className="flex-1" />}
    </div>
  )
}
