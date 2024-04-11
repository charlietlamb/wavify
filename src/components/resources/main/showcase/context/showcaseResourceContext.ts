import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface ShowcaseResourceContext {
  file: FileAndSender
  resource: ResourceAndUser
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

export const ShowcaseResourceContext = createContext<
  ShowcaseResourceContext | undefined
>(undefined)

export function useShowcaseResourceContext() {
  const context = useContext(ShowcaseResourceContext)
  if (!context) {
    throw new Error(
      'useShowcaseResourceContext must be used within a ShowcaseResourceProvider'
    )
  }
  return context
}
