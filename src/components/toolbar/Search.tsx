import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

export default function Search({
  query,
  setQuery,
  placeholder,
  className,
  divClassName,
}: {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  placeholder: string
  className?: string
  divClassName?: string
}) {
  return (
    <div className={cn('p-2', divClassName)}>
      <Input
        className={cn(
          'border border-zinc-700 bg-transparent py-4 text-zinc-200 focus-visible:border-zinc-200 focus-visible:ring-0',
          className
        )}
        placeholder={placeholder}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}
