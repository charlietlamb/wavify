import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function WavifyCardSkeletons() {
  return Array.from({ length: 8 }).map((_, index) => (
    <div
      key={index}
      className="flex h-fit flex-col gap-2 rounded-lg border border-zinc-700 p-4 transition hover:border-zinc-200"
    >
      <Skeleton className="relative aspect-square w-full rounded-xl" />
      <div className="flex max-w-full items-center gap-2 overflow-hidden">
        <Skeleton className="h-10 w-10 flex-shrink-0 rounded-full" />
        <div className="flex h-10 w-full flex-col gap-2">
          <Skeleton className="h-4 w-full rounded-sm" />
          <Skeleton className="h-4 w-full rounded-sm" />
        </div>
      </div>
    </div>
  ))
}
