import { Sorting } from '@/components/dashboard/resources/manage/data/data'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface CollectionsContext {
  collections: CollectionAndUser[]
  setCollections: Dispatch<SetStateAction<CollectionAndUser[]>>
  sorting: Sorting
  setSorting: Dispatch<SetStateAction<Sorting>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const CollectionsContext = createContext<CollectionsContext | undefined>(
  undefined
)

export function useCollectionsContext() {
  const context = useContext(CollectionsContext)
  if (!context) {
    throw new Error(
      'useCollectionsContext must be used within a CollectionsProvider'
    )
  }
  return context
}
