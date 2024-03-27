import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { resourceTypes } from './data/data'
import { useUploadContext } from './context/context'

export function ResourcesUploadType() {
  const { type, setType } = useUploadContext()
  return (
    <Select value={type} onValueChange={setType}>
      <SelectTrigger className="rounded-lg border border-zinc-700 bg-transparent ring-0 transition hover:border-zinc-200 focus:border-zinc-200 focus:ring-0">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {resourceTypes.map((t) => (
            <SelectItem value={t} key={t}>
              {t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
