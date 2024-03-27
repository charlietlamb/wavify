'use client'

import { useState, useEffect } from 'react'
import { DashboardContext } from './context/context'

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [endDate, setEndDate] = useState(new Date())
  const initStartDate = new Date(endDate)
  initStartDate.setMonth(endDate.getMonth() - 1)
  const [startDate, setStartDate] = useState(initStartDate)
  return (
    <DashboardContext.Provider
      value={{
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}
