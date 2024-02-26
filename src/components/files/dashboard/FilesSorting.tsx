import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFilesContext } from '../state/context'
import { SortingType } from '../data/data'

export default function FilesSorting() {
  const { setSorting } = useFilesContext()
  return (
    <Select onValueChange={(e) => setSorting(e as SortingType)}>
      <SelectTrigger className="w-auto border-2 border-zinc-200 ring-0 transition-all focus:ring-0">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="alphabetical">Alphabetical</SelectItem>
          <SelectItem value="date">Date Modified</SelectItem>
          <SelectItem value="size">Size</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
