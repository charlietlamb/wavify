import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon, UserRound } from 'lucide-react'
import Search from '@/components/toolbar/Search'
import Toolbar from '@/components/toolbar/Toolbar'
import { useUsersContext } from './context/usersContext'

export default function UsersToggle() {
  const { query, setQuery } = useUsersContext()
  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <Button variant="zinc_outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Toolbar
          title="Users"
          text="Browse member users."
          icon={
            <UserRound
              className="min-h-6 min-w-6 text-zinc-700"
              strokeWidth={2}
            />
          }
          mobile
          components={[
            <Search
              query={query}
              setQuery={setQuery}
              placeholder="Search users..."
            />,
          ]}
        />
      </SheetContent>
    </Sheet>
  )
}
