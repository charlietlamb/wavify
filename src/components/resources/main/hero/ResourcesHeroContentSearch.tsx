import { Input } from '@/components/ui/input'
import ButtonLoaderIcon from '@/components/utils/ButtonLoaderIcon'
import { useResourcesMainContext } from '../context/resourcesMainContext'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function ResourcesHeroContentSearch() {
  const { query, setQuery } = useResourcesMainContext()
  const [loading, setLoading] = useState(false)
  async function searchResources() {
    setLoading(true)
    // Search resources
    setLoading(false)
  }
  return (
    <div className="flex w-full gap-2">
      <Input
        className="border border-zinc-700 bg-transparent text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0"
        placeholder="Search all resources..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ButtonLoaderIcon
        icon={<Search />}
        onClick={() => searchResources()}
        isLoading={loading}
        variant="zinc"
        className="w-auto"
      />
    </div>
  )
}
