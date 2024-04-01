import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { SortingTime } from '../data/sortingTime'

interface CollectivesContext {
  collectives: CollectiveAndUser[]
  setCollectives: Dispatch<SetStateAction<CollectiveAndUser[]>>
  sorting: SortingTime
  setSorting: Dispatch<SetStateAction<SortingTime>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const CollectivesContext = createContext<CollectivesContext | undefined>(
  undefined
)

export function useCollectivesContext() {
  const context = useContext(CollectivesContext)
  if (!context) {
    throw new Error(
      'useCollectivesContext must be used within a CollectivesProvider'
    )
  }
  return context
}
