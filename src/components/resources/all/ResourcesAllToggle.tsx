import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import ResourcesAllToolbar from './ResourcesAllToolbar'
import { Button } from '@/components/ui/button'

export default function ResourcesAllToggle() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="zinc_outline" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <ResourcesAllToolbar mobile />
      </SheetContent>
    </Sheet>
  )
}
