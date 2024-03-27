import { Dispatch, SetStateAction, createContext, useContext } from 'react'
export interface GeneralContext {
  uploads: number
  setUploads: Dispatch<SetStateAction<number>>
  downloads: number
  setDownloads: Dispatch<SetStateAction<number>>
  views: number
  setViews: Dispatch<SetStateAction<number>>
  saves: number
  setSaves: Dispatch<SetStateAction<number>>
}

export const GeneralContext = createContext<GeneralContext | undefined>(
  undefined
)

export function useGeneralContext() {
  const context = useContext(GeneralContext)
  if (!context) {
    throw new Error(
      'useGeneralContext must be used within a ResourceGeneralProvider'
    )
  }
  return context
}
