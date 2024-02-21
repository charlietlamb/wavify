import { Loader2 } from 'lucide-react'
import { useFilesContext } from './context'

export default function ChatFilesLoader() {
  const context = useFilesContext()
  const { isFetchingNextPageFiles } = context
  return (
    <div className="flex justify-center">
      {isFetchingNextPageFiles && (
        <Loader2 className="my-4 h-6 w-6 animate-spin text-zinc-500" />
      )}
    </div>
  )
}
