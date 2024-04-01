import { Input } from '@/components/ui/input'
import { useMessagesContext } from './context/messagesContext'

export default function MessagesSearch() {
  const { query, setQuery } = useMessagesContext()
  return (
    <div className="p-2">
      <Input
        className="border border-zinc-700 bg-transparent py-4 text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
        placeholder="Search chats..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
