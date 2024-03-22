import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { useUser } from '@/state/user/useUser'
import { ChevronsUpDown, UserRoundCog } from 'lucide-react'

export default function DashboardHeaderSelect() {
  const user = useUser()
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-x-4 rounded-md border border-zinc-700 p-2 transition hover:border-zinc-200">
        <div className="flex gap-x-1">
          <UserRoundCog className="2-6 h-6 min-h-6 min-w-6 text-zinc-200" />
          {user.username}
        </div>
        <ChevronsUpDown className="h-5 min-h-5 w-5 min-w-5 text-zinc-700" />
      </PopoverTrigger>
      <PopoverContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut asperiores
        consequuntur perspiciatis, deleniti pariatur laudantium quidem accusamus
        iure velit error illum tempora earum, dolore veritatis itaque modi
        suscipit autem et!
      </PopoverContent>
    </Popover>
  )
}
