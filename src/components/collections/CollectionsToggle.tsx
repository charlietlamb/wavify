import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { MenuIcon, Table } from 'lucide-react'
import Toolbar from '../toolbar/Toolbar'
import Search from '../toolbar/Search'
import Sorting from '../toolbar/Sorting'
import { useCollectionsContext } from './context/collectionsContext'
import { sortingValues } from '../dashboard/resources/manage/data/data'

export default function CollectionsToggle() {
  const { query, setQuery, sorting, setSorting } = useCollectionsContext()
  return (
    <Sheet>
      <SheetTrigger asChild className="flex lg:hidden">
        <Button variant="zinc_outline">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <Toolbar
          title="Collections"
          text="Browse member collections."
          icon={
            <Table className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
          }
          mobile
          components={[
            <Search
              query={query}
              setQuery={setQuery}
              placeholder="Search collections..."
            />,
            <Sorting
              sorting={sorting}
              setSorting={setSorting}
              values={sortingValues}
            />,
          ]}
        />
      </SheetContent>
    </Sheet>
  )
}
