import { createContext, useContext } from 'react'

interface DashboardContext {}

export const FilesContext = createContext<DashboardContext | undefined>(
  undefined
)

export function useDashboardContext() {
  const context = useContext(FilesContext)
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider'
    )
  }
  return context
}
