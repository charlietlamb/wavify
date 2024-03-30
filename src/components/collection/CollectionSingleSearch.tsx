import { Input } from '@/components/ui/input'
import { useCollectionContext } from './context/collectionContext'

export default function CollectionSingleSearch() {
  const { query, setQuery } = useCollectionContext()
  return (
    <div className="p-2">
      <Input
        className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
        placeholder="Search collection..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
