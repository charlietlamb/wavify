import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface ResourceContext {
  resource: Resource
}

export const ResourceContext = createContext<ResourceContext | undefined>(
  undefined
)

export function useResourceContext() {
  const context = useContext(ResourceContext)
  if (!context) {
    throw new Error('useResourceContext must be used within a ResourceProvider')
  }
  return context
}
