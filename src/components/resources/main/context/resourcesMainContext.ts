import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface ResourcesMainContext {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  showcaseResources: ResourceAndUser[]
  showcaseIndex: number
  setShowcaseIndex: Dispatch<SetStateAction<number>>
}

export const ResourcesMainContext = createContext<
  ResourcesMainContext | undefined
>(undefined)

export function useResourcesMainContext() {
  const context = useContext(ResourcesMainContext)
  if (!context) {
    throw new Error(
      'useResourcesMainContext must be used within a ResourcesMainProvider'
    )
  }
  return context
}
