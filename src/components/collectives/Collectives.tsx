'use client'

import { Boxes } from 'lucide-react'
import Toolbar from '../toolbar/Toolbar'
import { useState } from 'react'
import { sortingValues } from '../dashboard/resources/manage/data/data'
import { CollectivesContext } from './context/collectivesContext'
import CollectivesContent from './CollectivesContent'
import Search from '../toolbar/Search'
import Sorting from '../toolbar/Sorting'
import { SortingTime } from './data/sortingTime'

export default function Collectives() {
  const [collectives, setCollectives] = useState<CollectiveAndUser[]>([])
  const [sorting, setSorting] = useState<SortingTime>('newest')
  const [query, setQuery] = useState<string>('')
  return (
    <CollectivesContext.Provider
      value={{
        collectives,
        setCollectives,
        sorting,
        setSorting,
        query,
        setQuery,
      }}
    >
      <div className="flex w-full divide-x divide-zinc-700">
        <Toolbar
          title="Collectives"
          text="Browse member Collectives."
          icon={
            <Boxes className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
          }
          components={[
            <Search
              query={query}
              setQuery={setQuery}
              placeholder="Search Collectives..."
            />,
            <Sorting
              sorting={sorting}
              setSorting={setSorting}
              values={sortingValues}
            />,
          ]}
        />
        <CollectivesContent />
      </div>
    </CollectivesContext.Provider>
  )
}
