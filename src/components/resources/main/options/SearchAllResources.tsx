import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SearchAllResources() {
  const router = useRouter()
  return (
    <div
      className="flex w-full flex-col rounded-lg border border-zinc-700 p-2 hover:border-zinc-200"
      onClick={() => router.push('/resources/all')}
    >
      <div className="flex cursor-pointer items-center gap-2 p-2">
        <div className="group flex h-12 w-12 transform items-center justify-center rounded-lg bg-gradient-to-br from-zinc-400 to-zinc-600">
          <Search className="group-hover:animate-pulse" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold leading-none">
            Search All Resources
          </h2>
          <p className="text-sm text-zinc-400">
            Search all resources on the site
          </p>
        </div>
      </div>
    </div>
  )
}
