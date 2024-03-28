import { Dispatch, SetStateAction, createContext, useContext } from 'react'
import { Sorting, Visibility } from '../data/data'

export interface ManageContext {
  visibility: Visibility | null
  setVisibility: Dispatch<SetStateAction<Visibility | null>>
  sorting: Sorting
  setSorting: Dispatch<SetStateAction<Sorting>>
}

export const ManageContext = createContext<ManageContext | undefined>(undefined)

export function useManageContext() {
  const context = useContext(ManageContext)
  if (!context) {
    throw new Error(
      'useManageContext must be used within a ResourceManageProvider'
    )
  }
  return context
}
