import { Dispatch, SetStateAction, createContext, useContext } from 'react'

interface DashboardContext {
  startDate: Date
  setStartDate: Dispatch<SetStateAction<Date>>
  endDate: Date
  setEndDate: Dispatch<SetStateAction<Date>>
}

export const DashboardContext = createContext<DashboardContext | undefined>(
  undefined
)

export function useDashboardContext() {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error(
      'useDashboardContext must be used within a DashboardProvider'
    )
  }
  return context
}
