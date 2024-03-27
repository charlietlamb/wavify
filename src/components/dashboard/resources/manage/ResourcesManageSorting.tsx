import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useManageContext } from './context/context'
import { sortingValues } from './data/data'

export default function ResourcesManageSorting() {
  const { sorting, setSorting } = useManageContext()
  return (
    <Select
      value={sorting}
      onValueChange={(value) => {
        if (
          value === 'newest' ||
          value === 'oldest' ||
          value === 'popular' ||
          value === 'unpopular' ||
          value === 'largest' ||
          value === 'smallest'
        )
          setSorting(value)
      }}
    >
      <SelectTrigger className="rounded-lg border border-zinc-700 bg-transparent ring-0 transition hover:border-zinc-200 focus:border-zinc-200 focus:ring-0">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {sortingValues.map((v) => (
            <SelectItem value={v} key={v}>
              {v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
