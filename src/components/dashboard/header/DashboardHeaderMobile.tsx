import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import DashboardHeaderMenu from './DashboardHeaderMenu'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export default function DashboardHeaderMobile() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTrigger asChild>
        <Button
          variant="zinc_outline"
          className="flex lg:hidden"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="px-0">
        <SheetHeader>
          <SheetTitle className="px-4 text-xl font-bold sm:text-2xl">
            Dashboard
          </SheetTitle>
        </SheetHeader>
        <Separator className="my-2 bg-zinc-700" />
        <DashboardHeaderMenu vertical onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
