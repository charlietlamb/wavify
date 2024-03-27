import { Sorting } from '@/components/dashboard/resources/manage/data/data'
import { ResourceType } from '@/components/dashboard/resources/upload/data/data'
import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface ResourcesContext {
  resources: ResourceAndUser[]
  setResources: Dispatch<SetStateAction<ResourceAndUser[]>>
  type: ResourceType | null
  setType: Dispatch<SetStateAction<ResourceType | null>>
  sorting: Sorting
  setSorting: Dispatch<SetStateAction<Sorting>>
  query: string
  setQuery: Dispatch<SetStateAction<string>>
}

export const ResourcesContext = createContext<ResourcesContext | undefined>(
  undefined
)

export function useResourcesContext() {
  const context = useContext(ResourcesContext)
  if (!context) {
    throw new Error(
      'useResourcesContext must be used within a ResourcesProvider'
    )
  }
  return context
}
