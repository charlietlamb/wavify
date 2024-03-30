import { SavedSorting } from '@/components/saved/data/savedSorting'
import { WavifyType } from '@/components/saved/data/wavifyTypes'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface CollectionContext {
  collection: Collection
  type: WavifyType | null
  setType: Dispatch<SetStateAction<WavifyType | null>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  sorting: SavedSorting
  setSorting: Dispatch<SetStateAction<SavedSorting>>
  items: ItemAndUser[]
  setItems: Dispatch<SetStateAction<ItemAndUser[]>>
}

export const CollectionContext = createContext<CollectionContext | undefined>(
  undefined
)

export function useCollectionContext() {
  const context = useContext(CollectionContext)
  if (!context) {
    throw new Error(
      'useCollectionContext must be used within a CollectionProvider'
    )
  }
  return context
}
