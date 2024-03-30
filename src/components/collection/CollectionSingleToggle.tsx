import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import CollectionSingleToolbar from './CollectionSingleToolbar'
import { Button } from '@/components/ui/button'

export default function CollectionSingleToggle() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="zinc_outline" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <CollectionSingleToolbar mobile />
      </SheetContent>
    </Sheet>
  )
}
