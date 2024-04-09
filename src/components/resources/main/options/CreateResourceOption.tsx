import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CreateResourceOption() {
  const router = useRouter()
  return (
    <div
      className="flex w-full flex-col rounded-lg border border-zinc-700 p-2 hover:border-zinc-200"
      onClick={() => router.push('/dashboard/resources/upload')}
    >
      <div className="flex cursor-pointer items-center gap-2 p-2">
        <div className="group flex h-12 w-12 transform items-center justify-center rounded-lg bg-gradient-to-br from-zinc-400 to-zinc-600">
          <Plus className="group-hover:animate-pulse" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold leading-none">
            Create a Resource
          </h2>
          <p className="text-sm text-zinc-400">
            Share your content with the community
          </p>
        </div>
      </div>
    </div>
  )
}
