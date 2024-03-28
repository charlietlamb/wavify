import DashboardHeader from '@/components/dashboard/header/DashboardHeader'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-h-full w-full flex-col overflow-hidden">
      <DashboardHeader />
      {children}
    </div>
  )
}
