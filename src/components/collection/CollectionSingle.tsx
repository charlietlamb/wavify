'use client'

import { useState } from 'react'
import CollectionSingleToolbar from './CollectionSingleToolbar'
import { CollectionContext } from './context/collectionContext'
import { WavifyType } from '../saved/data/wavifyTypes'
import { SavedSorting } from '../saved/data/savedSorting'
import CollectionSingleContent from './CollectionSingleContent'

export default function CollectionSingle({
  collection,
}: {
  collection: Collection
}) {
  const [type, setType] = useState<WavifyType | null>(null)
  const [query, setQuery] = useState<string>('')
  const [sorting, setSorting] = useState<SavedSorting>('newest')
  const [items, setItems] = useState<ItemAndUser[]>([])
  return (
    <CollectionContext.Provider
      value={{
        collection,
        type,
        setType,
        query,
        setQuery,
        sorting,
        setSorting,
        items,
        setItems,
      }}
    >
      <div className="min-w-screen max-h-screen w-full">
        <div className="flex h-full w-full flex-col overflow-hidden overflow-y-auto sm:max-h-full sm:flex-row sm:divide-x sm:divide-zinc-700 sm:overflow-hidden">
          <CollectionSingleToolbar />
          <CollectionSingleContent />
        </div>
      </div>
    </CollectionContext.Provider>
  )
}
