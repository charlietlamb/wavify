import { SearchX } from 'lucide-react'
import React from 'react'

export default function NothingFound({
  text = "There's nothing to find here...",
}: {
  text?: string
}) {
  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center gap-4 p-4">
      <span className="text-2xl font-bold text-zinc-200">{text}</span>
      <SearchX className="h-12 w-12 text-zinc-400" />
    </div>
  )
}
