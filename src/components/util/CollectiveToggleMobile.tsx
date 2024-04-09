import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import CollectiveSidebar from '../collective/CollectiveSidebar'

export const CollectiveToggleMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="p-2 md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex bg-background_content p-0 pl-4">
        <div className="w-full pr-12">
          <CollectiveSidebar mobile />
        </div>
      </SheetContent>
    </Sheet>
  )
}
