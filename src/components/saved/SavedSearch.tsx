import { Input } from '@/components/ui/input'
import { useSavedContext } from './context/savedContext'

export default function SavedSearch() {
  const { query, setQuery } = useSavedContext()
  return (
    <Input
      className="border border-zinc-700 bg-transparent py-4 text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
      placeholder="Search saves..."
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}
