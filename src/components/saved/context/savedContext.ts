import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { WavifyType } from '../data/wavifyTypes'
import { SavedSorting } from '../data/savedSorting'

interface SavedContext {
  items: Item[]
  setItems: Dispatch<SetStateAction<Item[]>>
  type: WavifyType | null
  setType: Dispatch<SetStateAction<WavifyType | null>>
  sorting: SavedSorting
  setSorting: Dispatch<SetStateAction<SavedSorting>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const SavedContext = createContext<SavedContext | undefined>(undefined)

export function useSavedContext() {
  const context = useContext(SavedContext)
  if (!context) {
    throw new Error('useSavedContext must be used within a SavedProvider')
  }
  return context
}
