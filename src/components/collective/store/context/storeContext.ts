import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface StoreContext {
  space: Space
  packages: PackageData[]
  setPackages: Dispatch<SetStateAction<PackageData[]>>
  roles: Role[]
  setRoles: Dispatch<SetStateAction<Role[]>>
}

export const StoreContext = createContext<StoreContext | undefined>(undefined)

export function useStoreContext() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStoreContext must be used within a StoreProvider')
  }
  return context
}
