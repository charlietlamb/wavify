import DashboardHeader from '@/components/dashboard/header/DashboardHeader'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col">
      <DashboardHeader />
      {children}
    </div>
  )
}
