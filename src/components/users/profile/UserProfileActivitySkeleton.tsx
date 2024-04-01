import { Skeleton } from '@/components/ui/skeleton'

export default function UserProfileActivitySkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex gap-2">
          <Skeleton className="min-h-10 min-w-10 rounded-md" />
          <div className="flex flex-grow flex-col gap-2">
            <Skeleton className="h-[18px] w-full rounded-sm" />
            <Skeleton className="h-[18px] w-full rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  )
}
