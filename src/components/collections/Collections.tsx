'use client'

import { Table } from 'lucide-react'
import Toolbar from '../toolbar/Toolbar'
import { useState } from 'react'
import {
  Sorting as SortingType,
  sortingValues,
} from '../dashboard/resources/manage/data/data'
import { CollectionsContext } from './context/collectionsContext'
import CollectionsContent from './CollectionsContent'
import Search from '../toolbar/Search'
import Sorting from '../toolbar/Sorting'

export default function Collections() {
  const [collections, setCollections] = useState<CollectionAndUser[]>([])
  const [sorting, setSorting] = useState<SortingType>('newest')
  const [query, setQuery] = useState<string>('')
  return (
    <CollectionsContext.Provider
      value={{
        collections,
        setCollections,
        sorting,
        setSorting,
        query,
        setQuery,
      }}
    >
      <div className="flex w-full divide-x divide-zinc-700">
        <Toolbar
          title="Collections"
          text="Browse member collections."
          icon={
            <Table className="min-h-6 min-w-6 text-zinc-700" strokeWidth={2} />
          }
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
        <CollectionsContent />
      </div>
    </CollectionsContext.Provider>
  )
}
