import { Input } from '@/components/ui/input'
import { useResourcesContext } from './context/resourcesContext'

export default function ResourcesAllSearch() {
  const { query, setQuery } = useResourcesContext()
  return (
    <Input
      className="flex-grow border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
      placeholder="Search resources..."
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
