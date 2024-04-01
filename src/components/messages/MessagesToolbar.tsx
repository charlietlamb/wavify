import MessagesChatMap from './MessagesChatMap'
import MessagesSearch from './MessagesSearch'

export default function MessagesToolbar() {
  return (
    <div className="flex flex-col divide-y divide-zinc-700">
      <MessagesSearch />
      <MessagesChatMap />
    </div>
  )
}
