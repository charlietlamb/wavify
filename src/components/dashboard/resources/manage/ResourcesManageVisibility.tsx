import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { visibilities } from './data/data'
import { useManageContext } from './context/context'

export default function ResourcesManageVisibility() {
  const { visibility, setVisibility } = useManageContext()
  return (
    <Select
      value={visibility}
      onValueChange={(value) => {
        if (value === 'all' || value === 'public' || value === 'draft')
          setVisibility(value)
      }}
    >
      <SelectTrigger className="rounded-lg border border-zinc-700 bg-transparent ring-0 transition hover:border-zinc-200 focus:border-zinc-200 focus:ring-0">
        <SelectValue placeholder="Select a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {visibilities.map((v) => (
            <SelectItem value={v} key={v}>
              {v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
