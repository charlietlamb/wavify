import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export interface ManageContext {
  visibility: 'all' | 'public' | 'draft'
  setVisibility: Dispatch<SetStateAction<'all' | 'public' | 'draft'>>
  sorting:
    | 'newest'
    | 'oldest'
    | 'popular'
    | 'unpopular'
    | 'largest'
    | 'smallest'
  setSorting: Dispatch<
    SetStateAction<
      'newest' | 'oldest' | 'popular' | 'unpopular' | 'largest' | 'smallest'
    >
  >
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
