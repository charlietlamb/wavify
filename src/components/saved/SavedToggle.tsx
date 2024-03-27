import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import SavedToolbar from './SavedToolbar'

export default function SavedToggle() {
  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <Button variant="zinc_outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SavedToolbar mobile />
      </SheetContent>
    </Sheet>
  )
}
