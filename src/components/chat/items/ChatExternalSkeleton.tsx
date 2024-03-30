import { Skeleton } from '@/components/ui/skeleton'

export default function ChatExternalSkeleton() {
  return (
    <div className="mt-2 flex w-full justify-between rounded-lg p-4">
      <div className="flex w-full gap-2">
        <Skeleton className="relative h-12 min-h-12 w-12 min-w-12 flex-shrink-0 rounded-sm" />

        <div className="flex max-h-12 w-full flex-grow flex-col gap-2">
          <Skeleton className="h-5 w-full rounded-sm" />
          <Skeleton className="h-5 w-[75%] rounded-sm" />
        </div>
      </div>
    </div>
  )
}
