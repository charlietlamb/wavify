import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import CollectiveSidebar from '../collective/CollectiveSidebar'
import { useUser } from '@/state/user/useUser'
import { useCollective } from '@/state/collective/useCollective'

export const CollectiveToggle = () => {
  const user = useUser()
  const { collective, colUser, colUsers, roles, spaces } = useCollective()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex bg-background_content p-0 pl-4">
        <div className="w-full pr-12">
          <CollectiveSidebar
            user={user}
            collective={collective}
            colUser={colUser}
            colUsers={colUsers}
            roles={roles}
            spaces={spaces}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
