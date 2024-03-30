'use client'

import { useState } from 'react'
import SavedToolbar from './SavedToolbar'
import { SavedContext } from './context/savedContext'
import { WavifyType } from './data/wavifyTypes'
import SavedMap from './SavedMap'
import { SavedSorting } from './data/savedSorting'

export default function Saved() {
  const [items, setItems] = useState<ItemAndUser[]>([])
  const [type, setType] = useState<WavifyType | null>(null)
  const [sorting, setSorting] = useState<SavedSorting>('newest')
  const [query, setQuery] = useState('')
  return (
    <SavedContext.Provider
      value={{
        items,
        setItems,
        type,
        setType,
        sorting,
        setSorting,
        query,
        setQuery,
      }}
    >
      <div className="flex w-full divide-x divide-zinc-700">
        <SavedToolbar />
        <SavedMap />
      </div>
    </SavedContext.Provider>
  )
}
