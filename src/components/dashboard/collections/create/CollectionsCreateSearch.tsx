import { Input } from '@/components/ui/input'
import { useCollectionsCreateContext } from './context/collectionsCreateContext'

export default function CollectionsCreateSearch() {
  const { query, setQuery } = useCollectionsCreateContext()
  return (
    <div className="p-2">
      <Input
        className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
        placeholder="Search saves..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
